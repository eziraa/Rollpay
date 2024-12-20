from rest_framework import serializers
from employee.serializers.salary import SalarySerializer
from employee.serializers.asset import AssetSerializer
from ..models import Employee, EmployeePosition, Position
import random

from datetime import datetime

class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    salary = serializers.SerializerMethodField(read_only=True)
    position = serializers.SerializerMethodField(read_only=True)
    profile_picture = serializers.SerializerMethodField(read_only=True)
    assets = AssetSerializer(many=True, read_only=True)


    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'gender', 'email',
                  'phone_number', 'date_of_birth', 'date_of_hire', 'position', 'salary', 'profile_picture','assets')

    def get_salary(self, obj: Employee):
        if obj.salaries.all():
         return obj.salaries.all().last().basic_salary
        else:
            return 0
        return 0

    def get_position(self, obj: Employee):
        if obj.positions.all():
            return obj.positions.all().last().position.position_name
        else:
            return 0

    def get_profile_picture(self, obj: Employee):
        user = obj.user
        if user:
            if user.profile_pictures.all().last():
                return user.profile_pictures.all().last().profile_picture.url

        return "/media/photos/profile.png"


class SalaryEmployeeSerializer(EmployeeSerializer):
    salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'salary', 'profile_picture')

    def get_salary(self, obj: Employee):
        return SalarySerializer(obj.salary).data


class AdminEmployeeSerializer(EmployeeSerializer):
    user_id = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'gender',
                  'phone_number', 'position', 'email', 'user_id')

    def get_user_id(self, obj: Employee):
        return obj.user_id
