from django.db import models
from django.contrib.auth.models import User as BaseUser


class TaxRules(models.Model):
    salary_min = models.IntegerField(null=False)
    salary_max = models.IntegerField(null=False)
    tax_rate = models.DecimalField(max_digits=6, decimal_places=2, null=False)
    deduction = models.DecimalField(max_digits=6, decimal_places=2, null=False)


class Allowance(models.Model):
    allowance_type = models.CharField(max_length=255, null=False)
    allowance_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    def __str__(self):
        return self.allowance_type


class Overtime(models.Model):
    overtime_type = models.CharField(max_length=255, null=False)
    overtime_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    length = models.IntegerField(null=True)
    def __str__(self):
        return self.overtime_type    


class Deduction(models.Model):
    deduction_type = models.CharField(max_length=255, null=False)
    deduction_rate = models.DecimalField(
        max_digits=7, decimal_places=2, null=False)
    def __str__(self):
        return self.deduction_type


class Salary(models.Model):
    basic_salary = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=False)
    allowances = models.ManyToManyField(
        Allowance, blank=True)
    overtimes = models.ManyToManyField(
        Overtime,  blank=True)
    deductions = models.ManyToManyField(
        Deduction, blank=True)
    net_salary = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    gross_salary = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)
    total_deduction = models.DecimalField(
        max_digits=7, decimal_places=2, blank=True, null=True)

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
