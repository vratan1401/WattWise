from django.contrib import admin
from django.urls import path
from api.views import getAdmin, updateDatabase, getData

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/get_admin', getAdmin),
    path('api/get_data', getData),
    path('api/update_db', updateDatabase),
]
