

from rest_framework import serializers
from employee.models import CustomUser, Role
from employee.serializers.roles import RoleSerializer


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
