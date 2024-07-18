from rest_framework import serializers
from employee.models import Role
from employee.serializers.group import GroupSerializer


class RoleSerializer(serializers.ModelSerializer):
    groups = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Role
        fields = ("id", 'name', 'groups', 'created_at')

    def get_groups(self, obj: Role):
        return GroupSerializer(obj.groups, many=True).data
