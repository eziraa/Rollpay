from django.contrib.auth.models import Group, Permission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from employee.serializers.group import GroupSerializer
from employee.serializers.permissions import PermissionSerializer
import json

class GroupView(APIView):
    def get(self, request: Request, *args, **kwargs):
        data = GroupSerializer(Group.objects.all(), many=True).data
        return Response(data=data, status=200)

    def post(self, request: Request, *args, **kwargs):
        group_name = request.POST.get('group_name', None)
        if group_name is None:
            return Response({'error': 'Group name not specified'}, status=404)
        else:
            group = Group.objects.filter(name=group_name)
            if group.exists():
                return Response({'error': 'Group name not specified'}, status=404)
            else:
                group = Group.objects.create(name=group_name)
                permissions = request.POST.get('permissions')
                permissions = Permission.objects.filter(
                    codename__in=permissions)
                permissions = PermissionSerializer(permissions, many=True)
                group.save()
                return Response(permissions.data, status=200)
