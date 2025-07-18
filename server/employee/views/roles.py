from django.contrib.auth.models import Permission
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from employee.serializers.roles import RoleSerializer
from employee.models import Role, Group
import json


class RoleView(APIView):
    def get(self, request: Request, role_id=None, *args, **kwargs):
        if role_id is not None:
            role = Role.objects.get(id=role_id)
            serializer = RoleSerializer(role)
            return Response(serializer.data, status=200)
        data = RoleSerializer(Role.objects.all(), many=True).data
        return Response(data=data, status=200)

    def post(self, request: Request, *args, **kwargs):
        role_name = request.data['name']
        if role_name is None:
            return Response({'error': 'Role name not specified'}, status=400)
        else:
            role = Role.objects.filter(name=role_name)
            if role.exists():
                return Response({'error': 'Role aleady exist '}, status=400)
            else:
                role = Role.objects.create(name=role_name)
                groups = request.data['groups']
                groups = Group.objects.filter(
                    id__in=groups)
                role.groups.set(groups)
                role.save()
                serrializer = RoleSerializer(role)
                return Response(serrializer.data, status=201)

    def delete(self, request: Request, role_id=None, *args, **kwargs):
        if role_id is not None:
            role = Role.objects.filter(id=role_id)
            if role.exists():
                role.delete()
                return Response({'message': 'Role deleted'}, status=200)
            else:
                return Response({'error': 'Role not found'}, status=404)
        else:
            data = json.loads(request.body)
            roles_id = data.get('roles', [])
            if roles_id is not None:
                roles = Role.objects.filter(id__in=roles_id)
                if roles.exists():
                    roles.delete()
                    return Response(RoleSerializer(Role.objects.all(), many=True).data, status=200)
                else:
                    return Response({'error': 'Role not found'}, status=404)

            return Response({'error': 'Role id not provided'}, status=400)

    def put(self, request: Request, *args, **kwargs):
        role_id = request.data.get('id')
        role_name = request.data.get('name')
        role_groups = request.data.get('groups')
        if not role_id:
            return Response({'error': 'Role name not specified'}, status=400)
        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=404)

        # Use request.data directly
        role.name = role_name
        groups = Group.objects.filter(
            id__in=role_groups)
        role.groups.clear()
        for group in groups:
            role.groups.add(group)
        role.save()
        serializer = RoleSerializer(role)
        return Response(serializer.data, status=200)
