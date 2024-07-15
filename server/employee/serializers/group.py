
from django.contrib.auth.models import Group
from rest_framework import serializers
from ..models import CustomUser


class GroupSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions')

    def get_permissions(self, obj: Group):
        return obj.permissions.all().values('id', 'name', 'codename')
