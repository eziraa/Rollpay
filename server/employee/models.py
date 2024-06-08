# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class Employee(User):
    Male = 'M'
    Female = 'F'
    GENDER_CHOICES = (
        (Male, 'Male'),
        (Female, 'Female'),
    )
    phone_number = models.CharField(max_length=15,null=False)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=False)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_hire = models.DateField(auto_now=True,null=False)
    position = models.CharField(max_length=100,null=False)
    profile_picture = models.CharField(max_length=255, null=False, blank=True)
