from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)  
    class Meta:
        model = Employee
        fields = ('id','first_name', 'last_name', 'gender', 'email', 'phone_number','date_of_birth','date_of_hire', 'position' )

class ProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = "profile_picture"



