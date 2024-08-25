# Create your models h
from django.db import models
from .users import Users


class GPS(models.Model):
    personneSuivi_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    latitude=models.FloatField()
    longitude=models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'gps'

    def __str__(self):
        return f"Lat: {self.latitude}, Lon: {self.longitude},personne:{self.personneSuivi_id}"