from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User as BaseUser, Group
from month.models import MonthField

def upload_to(_, filename):
    return 'photos/{filename}'.format(filename = filename)

def upload_file(_, filename):
    return 'documents/{filename}'.format(filename=filename)


class Role(models.Model):
    """
    Model to represent a role in the system.
    It includes the role name, description, and the date it was created.
    1. created_at: The date and time when the role was created.
    2. ended_at: The date and time when the role was ended (if applicable).
    3. name: The name of the role, which is a required field.
    4. groups: A many-to-many relationship with Django's Group model, allowing the role to be associated with multiple groups.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    name = models.CharField(max_length=100, null=False, blank=False)
    groups = models.ManyToManyField(Group, blank=False)




class CustomUser(BaseUser):
    """
    Model to represent a custom user in the system.
    It extends the default Django User model to include additional fields.
    1. created_at: The date and time when the user was created.
    2. updated_at: The date and time when the user was last updated.
    3. is_active: A boolean field indicating whether the user is active or not.
    4. is_staff: A boolean field indicating whether the user is a staff member or not.
    5. is_superuser: A boolean field indicating whether the user has superuser privileges or not.
    6. username: A unique identifier for the user, which is required.
    7. first_name: The first name of the user, which is required.
    8. last_name: The last name of the user, which is required.
    9. email: The email address of the user, which is required and must be unique.
    10. password: The password for the user, which is required.
    11. role: A foreign key relationship to the Role model, allowing the user to have a specific role in the system.
    """
    role = models.ForeignKey(Role, on_delete=models.DO_NOTHING, null=True, blank=True)


class ProfilePicture(models.Model):
    """
    Model to represent a profile picture for a user.
    It includes the user, the picture itself, and timestamps for creation and update.
    1. created_at: The date and time when the profile picture was created.
    2. updated_at: The date and time when the profile picture was last updated.
    3. profile_picture: An image field to store the profile picture, with a default value.
    4. user: A foreign key relationship to the CustomUser model, allowing the profile picture to be associated with a specific user.
    """
    
    created_at = models.DateTimeField(auto_now=True)
    profile_picture = models.ImageField(
        upload_to=upload_to, default="photos/profile.png")
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="profile_pictures")


class Allowance(models.Model):
    """
    Model to represent an allowance given to employees.
    It includes the allowance type, rate, and the period during which it is applicable.
    1. allowance_type: A string field to specify the type of allowance.
    2. allowance_rate: A decimal field to specify the rate of the allowance.
    3. start_at: A date and time field indicating when the allowance starts.
    4. end_at: A date and time field indicating when the allowance ends (if applicable).
    """
    allowance_type = models.CharField(max_length=255, null=False)
    allowance_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    start_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return self.allowance_type


class Overtime(models.Model):
    """
    Model to represent overtime work for employees.
    It includes the type of overtime, rate, and the period during which it is applicable.
    1. overtime_type: A string field to specify the type of overtime.
    2. overtime_rate: A decimal field to specify the rate of the overtime.
    3. start_at: A date and time field indicating when the overtime starts.
    4. end_at: A date and time field indicating when the overtime ends (if applicable).
    """
    overtime_type = models.CharField(max_length=255, null=False)
    overtime_rate = models.DecimalField(
        max_digits=6, decimal_places=2, null=False)
    start_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(null=True, blank=True)
    def __str__(self):
        return self.overtime_type


class Deduction(models.Model):
    """
    Model to represent deductions from employee salaries.
    It includes the type of deduction, rate, and the period during which it is applicable.
    1. deduction_type: A string field to specify the type of deduction.
    2. deduction_rate: A decimal field to specify the rate of the deduction.
    3. start_at: A date and time field indicating when the deduction starts.
    4. end_at: A date and time field indicating when the deduction ends (if applicable).
    """
    deduction_type = models.CharField(max_length=255, null=False)
    deduction_rate = models.DecimalField(
        max_digits=7, decimal_places=2, null=False)
    start_at = models.DateTimeField(auto_now_add=True)
    end_at = models.DateTimeField(blank=True, null=True)
    def __str__(self):
        return self.deduction_type


class Position(models.Model):

    """
    Model to represent a position in the company.
    It includes the position name, basic salary, start date, end date, and raise rate.
    1. id: An auto-incrementing primary key for the position.
    2. position_name: A string field to specify the name of the position, which is unique.
    3. basic_salary: A decimal field to specify the basic salary for the position.
    4. start_date: A date field indicating when the position was created, automatically set to the current date.
    5. end_date: A date field indicating when the position ended (if applicable).
    6. raise_rate: A decimal field to specify the rate of salary increase for the position, defaulting to 5.0%.
    """
    
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
    """
    Model to represent an employee in the company.
    It includes the employee's ID, first name, last name, phone number, email
    1. id: A unique identifier for the employee, which is a string of 9 characters.
    2. first_name: The first name of the employee, which is a string of up to 255 characters.
    3. last_name: The last name of the employee, which is a string of up to 255 characters.
    4. phone_number: The phone number of the employee, which is a string of up to 15 characters.
    5. email: The email address of the employee, which is a string of up to 255 characters.
    6. gender: The gender of the employee, which is a single character field with choices
    7. date_of_birth: The date of birth of the employee, which is a date field that can be null or blank.
    8. date_of_hire: The date when the employee was hired, which is automatically set to the current date.
    9. user: A one-to-one relationship with the CustomUser model, allowing the employee to have a user account.
    """
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
    """
    Model to represent the position of an employee in the company.
    It includes the employee, position, start date, and end date.
    1. An employee can have multiple positions over time.
    2. A position can be held by multiple employees at different times.
    3. The start date indicates when the employee started holding the position.
    4. The end date indicates when the employee stopped holding the position (if applicable).
    """
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

    """
        Model to represent the salary of an employee.
        It includes the basic salary, start date, end date, reason for salary change,
        and a foreign key relationship to the Employee model.
        1. basic_salary: A decimal field to specify the basic salary of the employee.
        2. start_date: A date field indicating when the salary was set, automatically set to the current date.
        3. end_date: A date field indicating when the salary ended (if applicable).
        4. reason: A text field to specify the reason for the salary change (if applicable).
        5. employee: A foreign key relationship to the Employee model, allowing the salary to be associated with a specific employee.
    """
    basic_salary = models.DecimalField(
        max_digits=12, decimal_places=2, blank=True, null=False)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)
    reason = models.TextField(null=True, blank=True)
    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="salaries")




class Payment(models.Model):
    """
    Model to represent a payment made to an employee.
    It includes the employee, payment date, month, and salary amount.
    1. employee: A foreign key relationship to the Employee model, allowing the payment to be associated with a specific employee.
    2. payment_date: A date field indicating when the payment was made, which can be null or blank.
    3. month: A MonthField to specify the month for which the payment is made.
    4. salary: A decimal field to specify the amount of the payment, which is required and cannot be blank.
    """
    
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
    """
    Model to represent an overtime item for an employee.
    It includes the overtime details, start and end time, and a foreign key relationship to the Payment model.
    1. overtime: A foreign key relationship to the Overtime model, allowing the overtime item to be associated with a specific overtime type.
    2. start_time: A date and time field indicating when the overtime started, which is required and cannot be blank.
    3. end_time: A date and time field indicating when the overtime ended, which is required and cannot be blank.
    4. payment: A foreign key relationship to the Payment model, allowing the overtime item to be associated with a specific payment.
    """
    overtime = models.ForeignKey(Overtime, on_delete=models.CASCADE)
    start_time = models.DateTimeField(null=False, blank=False, default=timezone.now)
    end_time = models.DateTimeField(
        null=False, blank=False, default=timezone.now)
    payment = models.ForeignKey(
        Payment, null=False, related_name="overtimes", blank=False, on_delete=models.CASCADE)


class AllowanceItem(models.Model):
    """
    Model to represent an allowance item for an employee.
    It includes the allowance details, date of giving, and a foreign key relationship to the Payment model.
    1. date_of_given: A date and time field indicating when the allowance was given, which is automatically set to the current date and time.
    2. payment: A foreign key relationship to the Payment model, allowing the allowance item to be associated with a specific payment.
    3. allowance: A foreign key relationship to the Allowance model, allowing the allowance item to be associated with a specific allowance type.
    """
    
    date_of_given = models.DateTimeField(
        auto_now_add=True)
    payment = models.ForeignKey(
        Payment, null=False, blank=False, on_delete=models.CASCADE, related_name="allowances")
    allowance = models.ForeignKey(
        Allowance, null=False, blank=False, on_delete=models.CASCADE)


class DeductionItem(models.Model):
    """
    Model to represent a deduction item for an employee.
    It includes the deduction details, date of giving, and a foreign key relationship to the Payment model.
    1. date_of_given: A date and time field indicating when the deduction was given, which is automatically set to the current date and time.
    2. payment: A foreign key relationship to the Payment model, allowing the deduction item to be associated with a specific payment.
    3. deduction: A foreign key relationship to the Deduction model, allowing the deduction item to be associated with a specific deduction type.
    """
    date_of_given = models.DateTimeField(auto_now_add=True)
    payment = models.ForeignKey(
        Payment, null=False, blank=False, on_delete=models.CASCADE, related_name="deductions")
    deduction = models.ForeignKey(
        Deduction, null=False, blank=False, on_delete=models.CASCADE)



class Asset(models.Model):
    """
    Model to represent an asset assigned to an employee.
    It includes the employee, asset name, and the asset value (file).
    1. id: An auto-incrementing primary key for the asset.
    2. employee: A foreign key relationship to the Employee model, allowing the asset to be associated with a specific employee.
    3. asset_name: A string field to specify the name of the asset, which is required.
    4. asset_value: A file field to store the asset value, which is required.
    """
    
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(
        Employee, related_name='assets', blank=True, on_delete=models.CASCADE)
    asset_name = models.CharField(max_length=255, null=False)
    asset_value = models.FileField(upload_to=upload_file)

    class Meta:
        unique_together = ('employee', 'asset_name')


class OTP(models.Model):
    """
    Model to represent a One-Time Password (OTP) for user verification.
    It includes the user, OTP code, token, creation timestamp, and whether the OTP has been used.
    1. user: A foreign key relationship to the User model, allowing the OTP to be associated with a specific user.
    2. otp: A string field to store the OTP code, which is unique.
    3. token: A string field to store a token associated with the OTP, which is required.
    4. created_at: A date and time field indicating when the OTP was created, which is automatically set to the current date and time.
    5. is_used: A boolean field indicating whether the OTP has been used or not, defaulting to False.
    """
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6, unique=True)
    token = models.CharField(max_length=255, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.otp}"
