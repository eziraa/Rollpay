
from re import match
from django.http import JsonResponse
from django.contrib.auth.models import User, Permission, Group
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser

from employee.serializers.employee import EmployeeSerializer, ProfilePicSerializer
from employee.models import *


class UserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request, employee_id: None, *args, **kwargs):
        if employee_id:
            try:
                user = request.user
                employee = Employee.objects.get(pk=employee_id)
                serializer = EmployeeSerializer(employee)
                data = {
                    "employee": serializer.data,
                    "employee_id": employee_id,
                    "username": user.username,
                }
                return Response(data, status=status.HTTP_200_OK)
            except Employee.DoesNotExist:
                return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        user = User.objects.get(id=request.user.id)
        return Response({"username": user.username, "email": user.email}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        logout(request)
        return Response("Logged out", status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        data = request.data
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.save()
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProfilePicture(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, employee_id, format=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        profile_picture = request.data.get('profile_picture')
        if profile_picture:
            if employee.profile_picture:
                if default_storage.exists(employee.profile_picture.name):
                    default_storage.delete(employee.profile_picture.name)

            employee.profile_picture = profile_picture

        serializer = ProfilePicSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, employee_id, format=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProfilePicSerializer(employee)

        return Response(serializer.data, status=status.HTTP_200_OK)

            
class AccountView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            if Employee.objects.filter(id=data['empID']).exists():

                empoyee = Employee.objects.get(id=data['empID'])
                if User.objects.filter(username=data['username']).exists():
                    return JsonResponse({'error': 'Username already exists'}, status=400)
                if empoyee.user:
                    return JsonResponse({'error': 'There is an other user registed in this ID Please check your ID '}, status=400)

                if empoyee.position == "Clerk":
                    group, created = Group.objects.get_or_create(
                        name="clerk")
                    content_types = ContentType.objects.get_for_models(
                        Employee, User, Salary, Payment, Position, Allowance, Deduction, Overtime, OvertimeItem)
                    permissions = Permission.objects.filter(
                        content_type__in=[content_type for content_type in content_types.values()])

                elif empoyee.position == "System Administrator":
                    group, created = Group.objects.get_or_create(
                        name="system_admin")
                    permissions = Permission.objects.all()
                else:
                    group, created = Group.objects.get_or_create(
                        name="employee")
                    content_type = ContentType.objects.get_for_model(User)
                    permissions = Permission.objects.filter(
                        content_type=content_type)

                user = User.objects.create_user(
                    username=data['username'], password=data['password'],
                )
                group.permissions.set(permissions)
                group.save()
                user.groups.add(group)
                user.save()
                empoyee.user = user
                empoyee.save()
                return JsonResponse({'message': 'User registered successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Employee does not exist \n Check Your ID'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        data = super().post(request=request)
        user = User.objects.get(username=request.data['username'])
        employee = get_object_or_404(Employee, user=user)
        if employee:
            data.data['employee'] = EmployeeSerializer(employee).data
        else:
            pass
        return Response(data=data.data, status=status.HTTP_200_OK)
