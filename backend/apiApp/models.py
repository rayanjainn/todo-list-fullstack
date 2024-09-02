from django.db import models

# Create your models here.

class user_cred(models.Model):
    username=models.CharField(max_length=20,blank=False)
    password = models.CharField(max_length=100,blank=False)

class todo_data(models.Model):
    title =models.CharField(max_length=200,blank=False)
    desc = models.TextField(blank=False)
    status = models.CharField(max_length=12,blank=False)