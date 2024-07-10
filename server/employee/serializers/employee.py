from rest_framework import serializers
from employee.serializers.salary import SalarySerializer
from ..models import Employee, Asset


class EmployeeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    salary = serializers.SerializerMethodField(read_only=True)
    profile_picture = serializers.SerializerMethodField(read_only=True)
    employement_contract = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'gender', 'email',
                  'phone_number', 'date_of_birth', 'date_of_hire', 'position', 'salary', 'profile_picture', 'employement_contract')

    def get_salary(self, obj: Employee):
        if obj.salaries.all():
         return obj.salaries.all().last().basic_salary
        else:
            return 0

    def get_profile_picture(self, obj: Employee):
        user = obj.user
        if user:

            if user.profile_picture:
                return user.profile_picture.profile_picture

        return "photos/profile.png"

    def get_employement_contract(self, obj: Employee):
        asset = Asset.objects.filter(
            employee=obj, asset_name="aggrement_doc")
        if asset:
            return asset.first().asset_value
        else:
            return "contract.pdf"


class SalaryEmployeeSerializer(EmployeeSerializer):
    salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'salary', 'profile_picture')

    def get_salary(self, obj: Employee):
        return SalarySerializer(obj.salary).data

