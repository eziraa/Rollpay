from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Employee, Salary, Allowance, Deduction, Overtime, Position
from decimal import Decimal
from django.db.models import Sum
from . import utils


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    # Change salary to a SerializerMethodField
    salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'gender', 'email',
                  'phone_number', 'date_of_birth', 'date_of_hire', 'position', 'salary')

    def get_salary(self, obj: Employee):
        return obj.salary.basic_salary

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        try:
            employee = Employee.objects.get(user=user)
            employee_serializer = EmployeeSerializer(employee)
            token['employee'] = employee_serializer.data
        except Employee.DoesNotExist:
            token['employee'] = None

        return token


class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "profile_picture"


class SalaryEmployeeSerializer(EmployeeSerializer):
    salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'salary')

    def get_salary(self, obj: Employee):
        return SalarySerializer(obj.salary).data


class SalarySerializer (serializers.ModelSerializer):

    gross_salary = serializers.SerializerMethodField(read_only=True)
    net_salary = serializers.SerializerMethodField(read_only=True)
    allowances = serializers.SerializerMethodField(read_only=True)
    deductions = serializers.SerializerMethodField(read_only=True)
    overtimes = serializers.SerializerMethodField(read_only=True)
    total_deduction = serializers.SerializerMethodField(
        read_only=True)

    income_tax = serializers.SerializerMethodField(read_only=True)

    class Meta:

        model = Salary
        fields = ('basic_salary', 'gross_salary',
                  "allowances", "deductions", "overtimes",
                  'total_deduction', "income_tax", "net_salary")

    def get_allowances(self, obj: Salary):
        return AllowanceSerializer(obj.allowances, many=True).data

    def get_deductions(self, obj: Salary):
        return DeductionSerializer(obj.deductions, many=True).data

    def get_overtimes(self, obj: Salary):
        return OvertimeSerializer(obj.overtimes, many=True).data

    def get_net_salary(self, obj: Salary):
        return round(Decimal(self.get_gross_salary(obj=obj)) - Decimal(self.get_total_deduction(obj)), 2)

    def get_total_deduction(self, obj: Salary) -> float:
        obj.total_deduction = 0
        for deduction in obj.deductions.all():
            obj.total_deduction += deduction.deduction_rate * obj.basic_salary / 100
        income_tax = self.get_income_tax(obj=obj)
        if income_tax:
            obj.total_deduction = float(obj.total_deduction) + income_tax
        return round(obj.total_deduction, 2)

    def get_gross_salary(self, obj: Salary) -> float:
        allowances_sum = sum(
            [allowance.allowance_rate for allowance in obj.allowances.all()])
        return float(obj.basic_salary + allowances_sum * obj.basic_salary / 100)

    def get_income_tax(self, obj: Salary) -> Decimal:
        return utils.income_tax(self.get_gross_salary(obj))


class AllowanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allowance
        fields = ("allowance_type", "allowance_rate")


class DeductionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Deduction
        fields = ("deduction_type", "deduction_rate")


class OvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overtime
        fields = ("overtime_type", "overtime_rate", "length")


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('position_name', 'basic_salary')
