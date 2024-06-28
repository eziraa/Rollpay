from typing import Any
from django.db import models
from django.contrib.auth.models import User as BaseUser
from month.models import MonthField
import datetime

def upload_to(instance, filename):
    return 'photos/{filename}'.format(filename = filename)

class TaxRules(models.Model):
    salary_min = models.IntegerField(null=False)
    salary_max = models.IntegerField(null=False)
    tax_rate = models.DecimalField(max_digits=6, decimal_places=2, null=False)
    deduction = models.DecimalField(max_digits=6, decimal_places=2, null=False)


class Allowance(models.Model):
    allowance_type = models.CharField(max_length=255, null=False)
    allowance_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    date_of_start = models.DateTimeField(auto_now=True)
    date_of_end = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return self.allowance_type


class Overtime(models.Model):
    overtime_type = models.CharField(max_length=255, null=False)
    overtime_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    def __str__(self):
        return self.overtime_type


class Deduction(models.Model):
    deduction_type = models.CharField(max_length=255, null=False)
    deduction_rate = models.DecimalField(
        max_digits=7, decimal_places=2, null=False)
    date_of_start = models.DateField(auto_now=True)
    date_of_end = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.deduction_type


class OvertimeItem (models.Model):
    overtime = models.ForeignKey(Overtime, on_delete=models.CASCADE)
    start_time = models.DateTimeField(
        null=False, blank=False, default=datetime.datetime.now())
    end_time = models.DateTimeField(
        null=False, blank=False, default=datetime.datetime.now())


class Salary(models.Model):
    basic_salary = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=False)
    allowances = models.ManyToManyField(
        Allowance, blank=True)
    overtimes = models.ManyToManyField(
        OvertimeItem,  blank=True, null=True)
    deductions = models.ManyToManyField(
        Deduction, blank=True)

    def __str__(self):
        return self.basic_salary


class Employee(models.Model):
    Male = 'M'
    Female = 'F'
    GENDER_CHOICES = (
        (Male, 'Male'),
        (Female, 'Female'),
    )
    id = models.CharField(max_length=9, db_index=True,
                          primary_key=True, unique=True, null=False)
    # profile_picture = models.ImageField(upload_to=upload_to, default="photos/profile.png")
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    phone_number = models.CharField(max_length=15, null=False)
    email = models.EmailField(max_length=255, null=False)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=False)
    date_of_birth = models.DateField(null=True, blank=True)
    date_of_hire = models.DateField(auto_now=True, null=False)
    position = models.CharField(max_length=100, null=False)
    user = models.OneToOneField(
        BaseUser, blank=True, null=True, on_delete=models.CASCADE)
    salary = models.OneToOneField(
        Salary, blank=True, null=True, on_delete=models.PROTECT)

    @staticmethod
    def generate_employee_id(last_id):
        employee_id = "ED" + str(int(last_id[2:])+1)
        return employee_id
    
    def __str__(self):
        return self.first_name + " " + self.last_name




class Payment(models.Model):
    employee = models.ForeignKey(Employee, blank=True,on_delete=models.PROTECT)
    payment_date = models.DateField(null=True, blank=True)
    month = MonthField()
    salary = models.ForeignKey(Salary, blank=False, on_delete=models.PROTECT)

    class Meta:
        unique_together = ('employee', 'month')

    def __str__(self):
        return "Payment of " + self.employee.first_name + " " + self.employee.last_name + " at  " + str(self.month)


class Position(models.Model):
    id = models.AutoField(primary_key=True)
    position_name = models.CharField(
        max_length=255, null=False, unique=True)
    basic_salary = models.DecimalField(
        max_digits=12, decimal_places=2, null=False)
    start_date = models.DateField(auto_now=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.position_name
