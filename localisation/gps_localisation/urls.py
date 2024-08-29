from django import views
from django.urls import path
from .views import GPSInfo,UsersInfo,Logout,LOGIN
from rest_framework.authtoken import views as auth_views

urlpatterns = [path('gps/', GPSInfo.as_view(), name='gps'),
               path('users/', UsersInfo.as_view(), name='users'),
               path('api-token-auth/', auth_views.obtain_auth_token),
                path('login/',LOGIN.as_view(),name='login'),
                path('logout/',Logout.as_view(),name='logout'),]
