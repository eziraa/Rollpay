from typing import Any
from django.db import models
from django.contrib.auth.models import User as BaseUser, Group
from month.models import MonthField
import datetime
import random
def upload_to(instance, filename):
    return 'photos/{filename}'.format(filename = filename)

def upload_file(instance, filename):
    return 'contracts/{filename}'.format(filename=filename)


class Role(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    groups = models.ManyToManyField(Group, blank=False)


class ProfilePicture(models.Model):
    created_at = models.DateTimeField(auto_now=True)
    profile_picture = models.ImageField(
        upload_to=upload_to, default="photos/profile.png")


class CustomUser(BaseUser):
    role = models.ForeignKey(
        Role, on_delete=models.DO_NOTHING, null=True, blank=True)
    profile_picture = models.OneToOneField(
        ProfilePicture, on_delete=models.SET_NULL, null=True, blank=True)

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.id = CustomUser.id_generator()

    @staticmethod
    def id_generator():
        users = CustomUser.objects.all()
        while True:
            generated_id = CustomUser.generate_id()
            if CustomUser.objects.filter(id=generated_id).exists():
                continue
            else:
                break
        return generated_id

    @staticmethod
    def generate_id():
        numbers = [number for number in '0123456789']
        generated_id = ""
        for i in range(0, 9):
            generated_id += random.choice(numbers)
        return generated_id



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
    start_at = models.DateField(auto_now_add=True)
    end_at = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.deduction_type


class OvertimeItem (models.Model):
    overtime = models.ForeignKey(Overtime, on_delete=models.CASCADE)
    start_time = models.DateTimeField(
        null=False, blank=False, default=datetime.datetime.now())
    end_time = models.DateTimeField(
        null=False, blank=False, default=datetime.datetime.now())





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
        CustomUser, blank=True, null=True, on_delete=models.SET_NULL)


    @staticmethod
    def generate_employee_id(last_id):
        employee_id = "ED" + str(int(last_id[2:])+1)
        return employee_id
    
    def __str__(self):
        return self.first_name + " " + self.last_name


class Salary(models.Model):
    basic_salary = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=False)
    start_date = models.DateField(auto_now_add=True)
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="salaries")




class Payment(models.Model):
    employee = models.ForeignKey(
        Employee, blank=True, on_delete=models.CASCADE)
    payment_date = models.DateField(null=True, blank=True)
    month = MonthField()
    salary = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=False)
    allowances = models.ManyToManyField(
        Allowance, blank=True)
    overtimes = models.ManyToManyField(
        OvertimeItem,  blank=True)
    deductions = models.ManyToManyField(
        Deduction, blank=True)


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


class Asset(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(
        Employee, blank=True, on_delete=models.PROTECT)
    asset_name = models.CharField(max_length=255, null=False)
    asset_value = models.FileField(upload_to=upload_file)

    class Meta:
        unique_together = ('employee', 'asset_name')
