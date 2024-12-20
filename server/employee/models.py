import uuid
from django.contrib.auth.models import User
from typing import Any
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User as BaseUser, Group
from month.models import MonthField
import datetime
import random

def upload_to(instance, filename):
    return 'photos/{filename}'.format(filename = filename)

def upload_file(instance, filename):
    return 'documents/{filename}'.format(filename=filename)


class Role(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    groups = models.ManyToManyField(Group, blank=False)




class CustomUser(BaseUser):
    role = models.ForeignKey(
        Role, on_delete=models.DO_NOTHING, null=True, blank=True)





class ProfilePicture(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    profile_picture = models.ImageField(
        upload_to=upload_to, default="photos/profile.png")
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="profile_pictures")


class Allowance(models.Model):
    allowance_type = models.CharField(max_length=255, null=False)
    allowance_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    start_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return self.allowance_type


class Overtime(models.Model):
    overtime_type = models.CharField(max_length=255, null=False)
    overtime_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    start_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return self.overtime_type


class Deduction(models.Model):
    deduction_type = models.CharField(max_length=255, null=False)
    deduction_rate = models.DecimalField(
        max_digits=7, decimal_places=2, null=False)
    start_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(blank=True, null=True)
    def __str__(self):
        return self.deduction_type


class Position(models.Model):
    id = models.AutoField(primary_key=True)
    position_name = models.CharField(
        max_length=255, null=False, unique=True)
    basic_salary = models.DecimalField(
        max_digits=12, decimal_places=2, null=False)
    start_date = models.DateField(auto_now=True)
    end_date = models.DateField(null=True, blank=True)
    raise_rate = models.DecimalField(
        max_digits=6, decimal_places=2, default=5.0)

    def __str__(self):
        return self.position_name





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
    date_of_hire = models.DateField(auto_now_add=True, null=False)
    user = models.OneToOneField(
        CustomUser, blank=True, null=True, on_delete=models.SET_NULL)

    @staticmethod
    def generate_employee_id(last_id):
        employee_id = "ED" + str(int(last_id[2:])+1)
        return employee_id
    
    def __str__(self):
        return self.first_name + " " + self.last_name


class EmployeePosition(models.Model):
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="positions")
    position = models.ForeignKey(
        Position, on_delete=models.CASCADE)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.employee.first_name + " " + self.employee.last_name + " - " + self.position.position_name

    def get_salary(self):
        return self.position.basic_salary



class Salary(models.Model):
    basic_salary = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)
    reason = models.TextField(null=True, blank=True)
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="salaries")




class Payment(models.Model):
    employee = models.ForeignKey(
        Employee, blank=True, on_delete=models.CASCADE)
    payment_date = models.DateField(null=True, blank=True)
    month = MonthField()
    salary = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=False)



    class Meta:
        unique_together = ('employee', 'month')

    def __str__(self):
        return "Payment of " + self.employee.first_name + " " + self.employee.last_name + " at  " + str(self.month)


class OvertimeItem (models.Model):
    overtime = models.ForeignKey(Overtime, on_delete=models.CASCADE)
    start_time = models.DateTimeField(
        null=False, blank=False, default=timezone.now())
    end_time = models.DateTimeField(
        null=False, blank=False, default=timezone.now())
    payment = models.ForeignKey(
        Payment, null=False, related_name="overtimes", blank=False, on_delete=models.CASCADE)


class AllowanceItem(models.Model):
    date_of_given = models.DateTimeField(
        auto_now_add=True)
    payment = models.ForeignKey(
        Payment, null=False, blank=False, on_delete=models.CASCADE, related_name="allowances")
    allowance = models.ForeignKey(
        Allowance, null=False, blank=False, on_delete=models.CASCADE)


class DeductionItem(models.Model):
    date_of_given = models.DateTimeField(
        auto_now_add=True)
    payment = models.ForeignKey(
        Payment, null=False, blank=False, on_delete=models.CASCADE, related_name="deductions")
    deduction = models.ForeignKey(
        Deduction, null=False, blank=False, on_delete=models.CASCADE)



class Asset(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(
        Employee, related_name='assets', blank=True, on_delete=models.CASCADE)
    asset_name = models.CharField(max_length=255, null=False)
    asset_value = models.FileField(upload_to=upload_file)

    class Meta:
        unique_together = ('employee', 'asset_name')


class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6, unique=True)
    token = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.otp}"
