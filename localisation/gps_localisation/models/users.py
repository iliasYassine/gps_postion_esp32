from django.db import models

class Users(models.Model):
    nom=models.CharField(max_length=200)
    prenom=models.CharField(max_length=200)
    adr=models.CharField(max_length=200)
    tel=models.CharField(max_length=200)
    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return f"{self.nom} ({self.id})"
    
