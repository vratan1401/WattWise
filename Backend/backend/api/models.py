from django.db import models

# Create your models here.
class Admin(models.Model):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
    
class Bill(models.Model):
    Month = models.CharField(max_length=255)
    Quarter_ID = models.IntegerField()
    Quarter_Type = models.CharField(max_length=255)
    Elec_Charge = models.FloatField()
    Fixed_Charge = models.FloatField()
    Meter_Rent = models.FloatField()
    Energy_Charge = models.FloatField()
    Total_Charge = models.FloatField()

    def __str__(self):
        return "{} - {}".format(self.Month,self.Quarter_ID)
    
class QuarterMetric(models.Model):
    Quarter_ID = models.IntegerField()
    Avg_Charge = models.FloatField()

    def __str__(self):
        return str(self.Quarter_ID)
    
class MonthMetric(models.Model):
    Month = models.CharField(max_length=255)
    Elec_Charge = models.FloatField()
    Elec_Charge_Perc = models.FloatField()
    Fixed_Charge = models.FloatField()
    Fixed_Charge_Perc = models.FloatField()
    Meter_Rent = models.FloatField()
    Meter_Rent_Perc = models.FloatField()
    Energy_Charge = models.FloatField()
    Energy_Charge_Perc = models.FloatField()
    Total_Charge = models.FloatField()

    def __str__(self):
        return self.Month