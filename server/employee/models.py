# Create your models here.
from django.db import models

import random
import string

def generate_employee_id(first_name, last_name):
    while True:
        first_initial = first_name[0].upper()
        last_initial = last_name[0].upper()
        random_number = ''.join(random.choices(string.digits, k=5))
        employee_id = f'E{first_initial}{last_initial}{random_number}'
        
        if not Employee.objects.filter(id=employee_id).exists():
            break
    
    return employee_id
class Employee(models.Model):
    Male = 'M'
    Female = 'F'
    GENDER_CHOICES = (
        (Male, 'Male'),
        (Female, 'Female'),
    )
    id = models.CharField(max_length=9, db_index=True,
                          primary_key=True, unique=True, null=False)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    phone_number = models.CharField(max_length=15,null=False)
    email = models.EmailField(max_length=255, null=False)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=False)
    email = models.EmailField(max_length=100, unique=True,null=False)
    phone_number = models.CharField(max_length=15,null=False)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_hire = models.DateField(auto_now=True,null=False)
    position = models.CharField(max_length=100, null=False)
    
    def save(self, *args, **kwargs):
            self.id = generate_employee_id(self.first_name, self.last_name)
            super(Employee, self).save(*args, **kwargs)



