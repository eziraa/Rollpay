from rest_framework import serializers
from employee.serializers.salary import SalarySerializer
from ..models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'gender', 'email',
                  'phone_number', 'date_of_birth', 'date_of_hire', 'position', 'salary', 'profile_picture')

    def get_salary(self, obj: Employee):
        if obj.salary:
         return obj.salary.basic_salary
        else:
            return 0


class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('profile_picture',)  

class SalaryEmployeeSerializer(EmployeeSerializer):
    salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'salary', 'profile_picture')

    def get_salary(self, obj: Employee):
        return SalarySerializer(obj.salary).data

