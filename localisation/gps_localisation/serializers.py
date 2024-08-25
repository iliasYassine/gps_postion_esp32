from rest_framework import serializers
from .models.users import Users
from .models.gps import GPS


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields=['nom','prenom','adr','tel','id']

class GPSSerializer(serializers.ModelSerializer):
    class Meta:
        model = GPS
        fields = ['latitude', 'longitude','personneSuivi_id']
