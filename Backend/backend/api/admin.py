from django.contrib import admin
from .models import Admin, Bill, QuarterMetric, MonthMetric

admin.site.register(Admin)
admin.site.register(Bill)
admin.site.register(QuarterMetric)
admin.site.register(MonthMetric)