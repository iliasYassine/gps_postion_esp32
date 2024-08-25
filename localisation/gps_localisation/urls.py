from django import views
from django.urls import path
from .views import GPSInfo,UsersInfo

urlpatterns = [path('gps/', GPSInfo.as_view(), name='gps'),
               path('users/', UsersInfo.as_view(), name='users'),]
