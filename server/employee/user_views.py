
from tokenize import TokenError
from django.http import JsonResponse
from django.contrib.auth.models import User, Permission, Group
from django.contrib.auth import authenticate, logout, login
from django.shortcuts import get_object_or_404
from django.contrib.contenttypes.models import ContentType
import json
from employee.models import Employee
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import InvalidToken
from .serializer import CustomTokenObtainPairSerializer

from .serializer import EmployeeSerializer

class UserView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        logout(request)
   
        return Response("Logged out", status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        data = request.data
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.save()
        return Response(status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        print("login")

        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            try:
                    employee = Employee.objects.get(user=user)
                    employee_serializer = EmployeeSerializer(employee)
                    print('user data', employee_serializer.data)
                    return Response({
                            "token": token.key,
                            "employee": employee_serializer.data 
                        })
            except Employee.DoesNotExist:
                return Response({"error": "Employee profile not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
                    return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AccountView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            if Employee.objects.filter(id=data['empID']).exists():
                employee = Employee.objects.get(id=data['empID'])
                if User.objects.filter(username=data['username']).exists():
                    return JsonResponse({'error': 'Username already exists'}, status=400)
                if employee.user:
                    return JsonResponse({'error': 'A user account is already registered with this Employee ID'}, status=400)
                user = User.objects.create_user(
                    username=data['username'], password=data['password'],
                )

                employee.user = user
                employee.save()
                group, created = Group.objects.get_or_create(name="employee")
                group, created = Group.objects.get_or_create(
                    name='add_emplyee')
                employee_permissions = Permission.objects.filter(
                    codename__in=['add_user', 'change_user, view_user'])

                # Assign permissions to the group
                permissions = Permission.objects.filter(
                    codename__in=['add_employee', 'change_employee'])
                group.permissions.set(permissions)
                group.save()
                user.groups.add(group)
                user.save()
                return JsonResponse({'message': 'User registered successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Employee does not exist \n Check Your ID'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)
        
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        data = super().post(request=request)
        print(data.data)
        user =User.objects.get(username = request.data['username'])
        employee = Employee.objects.get(user=user)
        # serializer = EmployeeSerializer(employee)
        data.data['employee'] =  EmployeeSerializer(employee).data
        print(data)
        return Response(data=data.data, status=status.HTTP_200_OK)
         

