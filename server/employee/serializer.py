from rest_framework import serializers
from .models import Employee, Salary, Allowance, Deduction, Overtime
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
        return SalarySerializer(obj.salary).data if obj.salary else None
        # base_salary = Decimal(obj.salary.basic_salary) if obj.salary else 0
        # bonus = Decimal(5000)  # Assuming a fixed bonus
        # calculated_salary = base_salary + bonus
        # if (obj.salary):
        #     if (obj.salary.allowances):
        #         for allowance in obj.salary.allowances.all():
        #             calculated_salary += allowance.allowance_rate * base_salary / 100
        #     if (obj.salary.deductions):
        #         for deduction in obj.salary.deductions.all():
        #             calculated_salary -= deduction.deduction_rate * base_salary / 100
        #     if (obj.salary.overtimes):
        #         for overtime in obj.salary.overtimes.all():
        #             calculated_salary += overtime.overtime_rate * overtime.length * base_salary / 100
        # return calculated_salary

class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "profile_picture"


class SalarySerializer (serializers.ModelSerializer):
    gross_salary = serializers.SerializerMethodField(
        read_only=True, allow_null=True)
    total_salary = serializers.DecimalField(
        max_digits=7, decimal_places=2, allow_null=True)
    net_salary = serializers.DecimalField(
        max_digits=7, decimal_places=2, allow_null=True)
    allowances = serializers.SerializerMethodField(read_only=True)
    deductions = serializers.SerializerMethodField(read_only=True)
    overtimes = serializers.SerializerMethodField(read_only=True)
    total_deduction = serializers.DecimalField(
        max_digits=7, decimal_places=2, allow_null=True)

    class Meta:

        model = Salary
        fields = ('basic_salary', 'gross_salary',
                  "allowances", "deductions", "overtimes", "total_salary",
                  'total_deduction', "net_salary")

    def get_allowances(self, obj: Salary):
        return AllowanceSerializer(obj.allowances, many=True).data

    def get_deductions(self, obj: Salary):
        return DeductionSerializer(obj.deductions, many=True).data

    def get_overtimes(self, obj: Salary):
        return OvertimeSerializer(obj.overtimes, many=True).data

    def get_total_salary(self, obj: Salary):
        return obj.gross_salary - obj.total_deduction

    def get_net_salary(self, obj: Salary):
        return obj.gross_salary - obj.total_deduction

    def get_total_deduction(self, obj: Salary):
        obj.total_deduction = 0
        for deduction in obj.deductions.all():
           obj.total_deduction += deduction.deduction_rate * obj.basic_salary / 100
        return obj.total_deduction

    def get_gross_salary(self, obj: Salary):
        allowances_sum = sum(
            [allowance.allowance_rate for allowance in obj.allowances.all()])
        return obj.basic_salary + allowances_sum * obj.basic_salary / 100

class AllowanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allowance
        fields = "__all__"


class DeductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deduction
        fields = "__all__"


class OvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overtime
        fields = "__all__"
