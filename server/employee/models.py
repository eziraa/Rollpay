# Create your models here.
from django.db import models

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
            self.id = self.generate_employee_id()
            super(Employee, self).save(*args, **kwargs)

    @staticmethod
    def generate_employee_id():
        last_employee = Employee.objects.last()
        if last_employee:
            last_id = int(last_employee.id[2:])  
            new_id = last_id + 1
        else:
            new_id = 1000  
        return f'ED{new_id}'

