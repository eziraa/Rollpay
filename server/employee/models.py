# Create your models here.
from django.db import models
from django.contrib.auth.models import User as BaseUser


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
    phone_number = models.CharField(max_length=15, null=False)
    email = models.EmailField(max_length=255, null=False)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=False)
    email = models.EmailField(max_length=100, unique=True, null=False)
    phone_number = models.CharField(max_length=15, null=False)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_hire = models.DateField(auto_now=True, null=False)
    position = models.CharField(max_length=100, null=False)
    user = models.OneToOneField(
        BaseUser, blank=True, null=True, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        employee = Employee.objects.last()
        self.id = Employee.generate_employee_id(employee.id)
        super(Employee, self).save(*args, **kwargs)

    @staticmethod
    def generate_employee_id(last_id):
        employee_id = "ED" + int(last_id[2:])+1
        return employee_id
