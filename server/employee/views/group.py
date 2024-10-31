from django.contrib.auth.models import Group, Permission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from employee.serializers.group import GroupSerializer
from employee.serializers.permissions import PermissionSerializer
import json

class GroupView(APIView):
    def get(self, request: Request, group_id=None, *args, **kwargs):

        if group_id is not None:
            group = Group.objects.get(id=group_id)
            serializer = GroupSerializer(group)
            return Response(serializer.data, status=200)
        data = GroupSerializer(Group.objects.all(), many=True).data
        return Response(data=data, status=200)

    def post(self, request: Request, *args, **kwargs):
        group_name = request.data['name']
        if group_name is None:
            return Response({'error': 'Group name not specified'}, status=400)
        else:
            group = Group.objects.filter(name=group_name)
            if group.exists():
                return Response({'error': 'Group aleady exist '}, status=400)
            else:
                group = Group.objects.create(name=group_name)
                permissions = request.data['permissions']
                permissions = Permission.objects.filter(
                    codename__in=permissions)
                group.permissions.set(permissions)
                group.save()
                serrializer = GroupSerializer(group)
                return Response(serrializer.data, status=201)

    def delete(self, request: Request, group_id=None, *args, **kwargs):
        if group_id is not None:
            group = Group.objects.filter(id=group_id)
            if group.exists():
                group.delete()
                return Response({'message': 'Group deleted'}, status=200)
            else:
                return Response({'error': 'Group not found'}, status=404)
        else:
            data = json.loads(request.body)
            groups_id = data.get('groups', [])
            if groups_id is not None:
                groups = Group.objects.filter(id__in=groups_id)
                if groups.exists():
                    groups.delete()
                    return Response(GroupSerializer(Group.objects.all(), many=True).data, status=200)
                else:
                    return Response({'error': 'Group not found'}, status=404)

            return Response({'error': 'Group id not provided'}, status=400)

    def put(self, request: Request, *args, **kwargs):
        group_id = request.data.get('id')
        group_name = request.data.get('name')
        group_permissions = request.data.get(
            'permissions')
        if not group_id:
            return Response({'error': 'Group name not specified'}, status=400)
        try:
            group = Group.objects.get(id=group_id)
        except Group.DoesNotExist:
            return Response({'error': 'Group not found'}, status=404)

        # Use request.data directly
        group.name = group_name
        permissions = Permission.objects.filter(
            codename__in=group_permissions)
        group.permissions.clear()
        for permission in permissions:
            group.permissions.add(permission)
        group.save()
        serializer = GroupSerializer(group)
        return Response(serializer.data, status=200)
