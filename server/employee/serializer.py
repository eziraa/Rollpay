from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('first_name', 'last_name', 'gender', 'email', 'phone_number','date_of_birth','date_of_hire', 'position' )

class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "profile_picture"



