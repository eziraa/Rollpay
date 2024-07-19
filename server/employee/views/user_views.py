
from re import match
from django.http import JsonResponse
from django.contrib.auth.models import Permission, Group
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

from employee.serializers.employee import EmployeeSerializer
from employee.serializers.user import UserSerializer
from employee.models import *


class UserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request, user_id=None, *args, **kwargs):
        if user_id:
            try:
                employee = Employee.objects.get(user_id=user_id)
                serializer = EmployeeSerializer(employee)
                profile_picture = employee.user.profile_pictures.all().last()
                user = employee.user
                data = {
                    'employee': serializer.data,
                    'username': user.username,
                    "role": user.role.name,
                    "profile_picture": profile_picture.profile_picture.url if profile_picture else "/media/photos/profile.png",
                    "employee_id": employee.id,
                    "user_id": user.id,
                    "error": "No profile picture uploaded"
                }
                return Response(data, status=status.HTTP_200_OK)
            except Employee.DoesNotExist:
                return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            if Employee.objects.filter(id=data['empID']).exists():
                empoyee = Employee.objects.get(id=data['empID'])
                if CustomUser.objects.filter(username=data['username']).exists():
                    return JsonResponse({'error': 'Username already exists'}, status=400)
                if empoyee.user:
                    return JsonResponse({'error': 'There is an other user registed in this ID Please check your ID '}, status=400)

                user = CustomUser.objects.create_user(
                    id=id_generator(),
                    first_name=empoyee.first_name,
                    last_name=empoyee.last_name,
                    email=empoyee.email,
                    username=data['username'],
                    password=data['password'],
                )
                RoleManager.add_role(user, empoyee.position)
                empoyee.user = user
                user.first_name
                user.save()
                print(user.last_login)
                empoyee.save()
                return Response(data=UserSerializer(user).data, status=201)
            else:
                return JsonResponse({'error': 'Employee does not exist \n Check Your ID'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)


    def delete(self, request: Request, user_id=None, *args, **kwargs):
        if user_id is not None:
            user = CustomUser.objects.filter(id=user_id)
            if user.exists():
                user.delete()
                return Response({'message': 'User deleted'}, status=200)
            else:
                return Response({'error': 'User not found'}, status=404)
        else:
            data = json.loads(request.body)
            users_id = data.get('users', [])
            if users_id is not None:
                users = CustomUser.objects.filter(id__in=users_id)
                if users.exists():
                    users.delete()
                    return Response(UserSerializer(CustomUser.objects.all(), many=True).data, status=200)
                else:
                    return Response({'error': 'User not found'}, status=404)

            return Response({'error': 'User id not provided'}, status=400)

    def put(self, request: Request, *args, **kwargs):
        user_id = request.data.get('id')
        user_name = request.data.get('name')
        user_role = request.data.get(
            'role')
        if not user_id:
            return Response({'error': 'User id not specified'}, status=400)
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        try:
            user_role = Role.objects.filter(role=user_role)
        except Role.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        # Use request.data directly
        user.name = user_name
        user.role = user_role
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)



class ProfilePictureView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, user_id, format=None):
        try:
            user = CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        profile_picture = request.data.get('profile_picture')
        if profile_picture:
            profile_picture = ProfilePicture.objects.create(
                profile_picture=profile_picture, user=user)
            profile_picture.save()
        else:
            return Response({"error": "No profile picture uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        employee = get_object_or_404(Employee, user=user)
        return Response(data={
            "employee": EmployeeSerializer(employee).data if EmployeeSerializer(employee).data is not None else {},
            "username": user.username,
            "role": user.role.name,
            "profile_picture": profile_picture.profile_picture.url if profile_picture.profile_picture else "/media/photos/profile.png",
            "employee_id": employee.id,
            "error": "No profile picture uploaded"
        }, status=status.HTTP_200_OK)
    def get(self, request, employee_id, format=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(employee)

        return Response(serializer.data, status=status.HTTP_200_OK)


@staticmethod
def id_generator():
    while True:
        generated_id = generate_id()
        if CustomUser.objects.filter(id=generated_id).exists():
            continue
        else:
            break
    return generated_id


@staticmethod
def generate_id():
    numbers = [number for number in '0123456789']
    generated_id = ""
    for i in range(0, 9):
        generated_id += random.choice(numbers)
    return generated_id

class AccountView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            if Employee.objects.filter(id=data['empID']).exists():
                empoyee = Employee.objects.get(id=data['empID'])
                if CustomUser.objects.filter(username=data['username']).exists():
                    return JsonResponse({'error': 'Username already exists'}, status=400)
                if empoyee.user:
                    return JsonResponse({'error': 'There is an other user registed in this ID Please check your ID '}, status=400)

                user = CustomUser.objects.create_user(
                    id=id_generator(),
                    first_name=empoyee.first_name,
                    last_name=empoyee.last_name,
                    email=empoyee.email,
                    username=data['username'],
                    password=data['password'],
                )
                RoleManager.add_role(user, empoyee.position)
                empoyee.user = user
                user.first_name
                user.save()
                user.last_login
                empoyee.save()
                return JsonResponse({'message': 'User registered successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Employee does not exist \n Check Your ID'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        data = super().post(request=request)
        user = CustomUser.objects.get(username=request.data['username'])
        employee = get_object_or_404(Employee, user=user)
        profile_picture = user.profile_pictures.all().last()
        if employee:
            data.data['employee'] = EmployeeSerializer(employee).data
            data.data['username'] = user.username
            data.data["role"] = user.role.name,
            data.data["profile_picture"] = profile_picture.profile_picture.url if profile_picture else "http://127.0.0.1:8000/media/photos/profile.png",
            data.data["employee_id"] = employee.id,
            data.data["user_id"] = user.id,
            data.data["error"] = "No profile picture uploaded"
        else:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(data=data.data, status=status.HTTP_200_OK)


class RoleManager:

    @staticmethod
    def add_role(user: CustomUser, position: str):
        groups = []
        if position == "Clerk":
            role, created = Role.objects.get_or_create(name="Clerk")
            group, created = Group.objects.get_or_create(
                name="employee_manager")
            content_types = ContentType.objects.get_for_models(
                Employee, CustomUser,  Position)
            permissions = Permission.objects.filter(
                content_type__in=[content_type for content_type in content_types.values()])
            group.permissions.set(permissions)
            group.save()
            groups.append(group)
            group, created = Group.objects.get_or_create(
                name="salary_manager")
            content_types = ContentType.objects.get_for_models(
                Salary, Payment, Allowance, Deduction, Overtime, OvertimeItem)
            permissions = Permission.objects.filter(
                content_type__in=[content_type for content_type in content_types.values()])
            group.permissions.set(permissions)
            group.save()
            groups.append(group)

        elif position == "System Administrator":
            role, created = Role.objects.get_or_create(name="sys_admin")
            group, created = Group.objects.get_or_create(
                name="system_admin")
            permissions = Permission.objects.all()
            group.permissions.set(permissions)
            group.save()
            groups.append(group)
        else:
            role, created = Role.objects.get_or_create(name="user")
            group, created = Group.objects.get_or_create(
                name="employee")
            content_type = ContentType.objects.get_for_model(CustomUser)
            permissions = Permission.objects.filter(
                content_type=content_type)
            group.permissions.set(permissions)
            group.save()
            groups.append(group)
        role.groups.set(groups)
        user.role = role
        user.groups.set(role.groups.all())
        role.save()
        user.save()
        return True
