import pandas as pd
import numpy as np
from django.shortcuts import render
from .models import Admin, Bill, QuarterMetric, MonthMetric
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt  # Import csrf_exempt decorator

# Create your views here.
def getAdmin(request):
    # get admin emails
    admins = Admin.objects.all()
    admin_data = [admin.email for admin in admins]
    
    return JsonResponse({'admins':admin_data})

def getData(request):
    try:
        # Query the database to fetch data from Bill, QuarterMetric, and MonthMetric tables
        bill_data = list(Bill.objects.all().values())
        quarter_metric_data = list(QuarterMetric.objects.all().values())
        month_metric_data = list(MonthMetric.objects.all().values())

        return JsonResponse({
            'bill_data': bill_data,
            'quarter_metric_data': quarter_metric_data,
            'month_metric_data': month_metric_data
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def updateDatabase(request):
    if request.method == 'POST':
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        file = request.FILES['file']
        try:
            # Read the Excel file into a dictionary of DataFrames, with sheet names(months) as keys
            xls = pd.read_excel(file,sheet_name=None,skiprows=3)

            # Appending Historical Data
            # Note: If file uploaded does not fit LWE format specified, error is thrown from below code section
            concated_df = pd.DataFrame()
            columns_to_filter = ['Month', 'Quarter No', 'Quarter Type', 'Elec. Charge', 'Demand /Fixed Charges (Rs/Unit)', 'Meter rent',
                                 'Energy charges Rs 0.20 per units', 'Total Electricity charges       Rs']
            for month,df in xls.items():
                df['Month'] = month
                df.rename(columns={'Energy Duty Rs 0.20 per units':'Energy charges Rs 0.20 per units'},inplace=True)
                df = df[columns_to_filter]
                df = df[~df['Quarter No'].isna()]
                df = df[~df['Month'].isna()]
                concated_df = pd.concat([concated_df,df],ignore_index=True)

            # Data Cleaning and Standardization
            concated_df['Quarter No'] = concated_df['Quarter No'].replace('179 / 177',177)
            concated_df[['Elec. Charge','Demand /Fixed Charges (Rs/Unit)','Meter rent','Energy charges Rs 0.20 per units']] = concated_df[['Elec. Charge','Demand /Fixed Charges (Rs/Unit)','Meter rent','Energy charges Rs 0.20 per units']].replace(np.nan,0)
            condition = concated_df['Total Electricity charges       Rs'] <= 0
            concated_df.loc[condition,'Total Electricity charges       Rs'] = concated_df.apply(lambda row: row['Elec. Charge']+row['Demand /Fixed Charges (Rs/Unit)']+row['Meter rent']+row['Energy charges Rs 0.20 per units'],axis=1)
            concated_df.rename(columns={'Quarter No':'Quarter ID','Elec. Charge':'Elec Charge','Demand /Fixed Charges (Rs/Unit)':'Fixed Charge','Meter rent':'Meter Rent','Energy charges Rs 0.20 per units':'Energy Charge','Total Electricity charges       Rs':'Total Charge'},inplace=True)
            concated_df['Month'] = pd.to_datetime(concated_df['Month'])
            concated_df['Month'] = concated_df['Month'].dt.strftime('%b %Y')
            concated_df[['Elec Charge','Fixed Charge','Meter Rent','Energy Charge','Total Charge']] = concated_df[['Elec Charge','Fixed Charge','Meter Rent','Energy Charge','Total Charge']].replace(np.nan,0)
            
            # Replacing Raw Bill Data
            Bill.objects.all().delete()
            for index,row in concated_df.iterrows():
                new_bill = Bill(
                    Month=row['Month'],
                    Quarter_ID=row['Quarter ID'],
                    Quarter_Type=row['Quarter Type'],
                    Elec_Charge=row['Elec Charge'],
                    Fixed_Charge=row['Fixed Charge'],
                    Meter_Rent=row['Meter Rent'],
                    Energy_Charge=row['Energy Charge'],
                    Total_Charge=row['Total Charge'])
                new_bill.save()

            # Calculating Month Metrics
            monthly_bill_df = concated_df.groupby('Month').agg({'Elec Charge':'sum','Fixed Charge':'sum','Meter Rent':'sum','Energy Charge':'sum','Total Charge':'sum'}).reset_index()
            monthly_bill_df['Elec Charge%'] = monthly_bill_df['Elec Charge']/monthly_bill_df['Total Charge']
            monthly_bill_df['Elec Charge%'] = monthly_bill_df['Elec Charge%'].replace(np.nan,0).replace(np.inf,0)*100
            monthly_bill_df['Fixed Charge%'] = monthly_bill_df['Fixed Charge']/monthly_bill_df['Total Charge']
            monthly_bill_df['Fixed Charge%'] = monthly_bill_df['Fixed Charge%'].replace(np.nan,0).replace(np.inf,0)*100
            monthly_bill_df['Meter Rent%'] = monthly_bill_df['Meter Rent']/monthly_bill_df['Total Charge']
            monthly_bill_df['Meter Rent%'] = monthly_bill_df['Meter Rent%'].replace(np.nan,0).replace(np.inf,0)*100
            monthly_bill_df['Energy Charge%'] = monthly_bill_df['Energy Charge']/monthly_bill_df['Total Charge']
            monthly_bill_df['Energy Charge%'] = monthly_bill_df['Energy Charge%'].replace(np.nan,0).replace(np.inf,0)*100
            monthly_bill_df['date'] = pd.to_datetime(monthly_bill_df['Month'])
            monthly_bill_df = monthly_bill_df.sort_values(by='date').drop(columns=['date'])
            
            # Replacing Month Metrics Data
            MonthMetric.objects.all().delete()
            for index,row in monthly_bill_df.iterrows():
                new_month = MonthMetric(
                    Month = row['Month'],
                    Elec_Charge = row['Elec Charge'],
                    Elec_Charge_Perc = row['Elec Charge%'],
                    Fixed_Charge = row['Fixed Charge'],
                    Fixed_Charge_Perc = row['Fixed Charge%'],
                    Meter_Rent = row['Meter Rent'],
                    Meter_Rent_Perc = row['Meter Rent%'],
                    Energy_Charge = row['Energy Charge'],
                    Energy_Charge_Perc = row['Energy Charge%'],
                    Total_Charge = row['Total Charge'])
                new_month.save()
            
            # Calculating Quarter Metrics
            quarter_bill_df = concated_df.groupby('Quarter ID').agg({'Total Charge':'mean'}).reset_index()
            quarter_bill_df = quarter_bill_df.sort_values(by='Total Charge',ascending=False).rename(columns={'Total Charge':'Avg Charge'})

            # Replacing Quarter Metrics Data
            QuarterMetric.objects.all().delete()
            for index,row in quarter_bill_df.iterrows():
                new_quarter = QuarterMetric(
                    Quarter_ID = row['Quarter ID'],
                    Avg_Charge = row['Avg Charge'])
                new_quarter.save()

            return JsonResponse({'message': 'Data uploaded successfully'})

        except Exception as e:
            print(e)
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Only POST requests are allowed for this endpoint'}, status=405)