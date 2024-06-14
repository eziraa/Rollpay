from rest_framework import serializers
from .models import Employee, Salary


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    # Change salary to a SerializerMethodField
    salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'gender', 'email',
                  'phone_number', 'date_of_birth', 'date_of_hire', 'position', 'salary')

    def get_salary(self, obj: Employee):
        base_salary = int(obj.salary.basic_salary) if obj.salary else 0
        bonus = 5000  # Assuming a fixed bonus
        calculated_salary = base_salary + bonus
        return calculated_salary

class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "profile_picture"


class SalarySerializer (serializers.ModelSerializer):
    gross_salary = serializers.DecimalField(
        max_digits=7, decimal_places=2, allow_null=True)
    total_salary = serializers.DecimalField(
        max_digits=7, decimal_places=2, allow_null=True)
    net_salary = serializers.DecimalField(
        max_digits=7, decimal_places=2, allow_null=True)

    class Meta:

        model = Salary
        fields = ('basic_salary', 'gross_salary',
                  'total_deduction', "net_salary")
