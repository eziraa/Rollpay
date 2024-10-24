

from django.contrib.auth.models import User
from rest_framework import serializers
from employee.models import CustomUser, Role, Employee
from employee.serializers.roles import RoleSerializer
from employee.serializers.permissions import PermissionSerializer
from employee.serializers.group import GroupSerializer


class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
                  "first_name",
                  "last_name",
                  "email",
                  "role")

    def get_role(self, user: CustomUser):
        return RoleSerializer(user.role).data


class MegaUserSerializer (UserSerializer):
    empID = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)
    is_staff = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "role",
            'is_admin',
            'is_staff',
            "password",
            "empID"

        )

    def get_empID(self, user: CustomUser):
        try:
            employee = Employee.objects.get(user=user)
            return employee.id
        except Employee.DoesNotExist:
            return None

    def get_is_admin(self, user: CustomUser):
        return user.is_superuser

    def get_is_staff(self, user: CustomUser):
        return user.is_staff
