
from re import match
import random
import datetime
from django.http import JsonResponse
from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import logout
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
import json
import os
from django.core.mail import send_mail
from django.core.signing import TimestampSigner
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator as token_generator

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser

from employee.serializers.employee import EmployeeSerializer
from employee.serializers.user import MegaUserSerializer
from employee.models import *


class UserView(APIView):
    permission_classes = [AllowAny]
    def get(self, request: Request, user_id=None, *args, **kwargs):
        if (user_id is not None):
            user = get_object_or_404(CustomUser, id=user_id)
            serializer = MegaUserSerializer(user)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        users = CustomUser.objects.all()
        serializer = MegaUserSerializer(users, many=True)
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
                RoleManager.add_role(
                    user, empoyee.positions.all().last().position.position_name)
                empoyee.user = user
                user.first_name
                user.save()
                empoyee.save()
                return Response(data=MegaUserSerializer(user).data, status=201)
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
                    return Response(MegaUserSerializer(CustomUser.objects.all(), many=True).data, status=200)
                else:
                    return Response({'error': 'User not found'}, status=404)

            return Response({'error': 'User id not provided'}, status=400)

    def put(self, request: Request, *args, **kwargs):
        user_id = request.data.get('id')
        user_name = request.data.get('name')
        role_id = request.data.get(
            'role')
        if not user_id:
            return Response({'error': 'User id not specified'}, status=400)
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        try:
            user_role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=404)

        # Use request.data directly
        user.name = user_name
        user.role = user_role

        user.groups.set(user_role.groups.all())
        employee = Employee.objects.filter(user=user).first()
        if employee and user_role:
            sys_admin_position = Position.objects.filter(
                position_name='System Administrator').first()
            clerk_position = Position.objects.filter(
                position_name='Clerk').first()

            if user_role.name == 'sys_admin' and sys_admin_position:
                EmployeePosition.objects.create(
                    employee=employee,
                    position=sys_admin_position,
                    start_date=datetime.datetime.now()
                )

            elif user_role.name == 'Clerk' and clerk_position:
                EmployeePosition.objects.create(
                    employee=employee,
                    position=clerk_position,
                    start_date=datetime.datetime.now()
                )
        serializer = MegaUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        user.save()
        serializer = MegaUserSerializer(user)



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
            "profile_picture": profile_picture.profile_picture.url if profile_picture.profile_picture else "/media/photos/profile.png",
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
            FRONT_END_URL = os.getenv('FRONT_END_URL')
            data = json.loads(request.body)
            if Employee.objects.filter(id=data['empID']).exists():
                employee = Employee.objects.get(id=data['empID'])
                if CustomUser.objects.filter(username=data['username']).exists():
                    return JsonResponse({'error': 'Username already exists'}, status=400)

                curr_user = CustomUser.objects.filter(
                    email=employee.email).first()
                if curr_user and curr_user.is_active:
                    return JsonResponse({'error': 'User already registered'}, status=400)
                elif curr_user and not curr_user.is_active:
                    curr_user.delete()
                user = CustomUser.objects.create_user(
                    id=id_generator(),
                    first_name=employee.first_name,
                    last_name=employee.last_name,
                    email=employee.email,
                    username=data['username'],
                    password=data['password'],
                )
                user.is_active = False
                user.save()
                # Generate signed confirmation link
                token = token_generator.make_token(user)
                signer = TimestampSigner()
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                uid = signer.sign(uid)
                confirm_link = f'{FRONT_END_URL}/confirm-registration/{uid}/{token}'
                # HTML content with a styled button
                html_message = f'''
                <html>
                <head>
                    <style>
                        .container {{
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }}
                        .header {{
                            background-color: #f7f7f7;
                            padding: 20px;
                            text-align: center;
                            border-bottom: 1px solid #ddd;
                        }}
                        .content {{
                            padding: 20px;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Confirm Your Registration</h2>
                        </div>
                        <div class="content">
                            <p>Dear {employee.first_name} {employee.last_name},</p>
                            <p>Thank you for registering. Please click the button below to confirm your registration:</p>
                            <a href="{confirm_link}" class="button" style="
                                    display: inline-block;
                                    padding: 10px 20px;
                                    font-size: 16px;
                                    color: #fff;
                                    background-color: #007bff;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    margin-top: 20px;">Confirm Registration</a>
                            <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                            <p>
                            <a href="{confirm_link}"

                                >{confirm_link}</a>
                            </p>
                            <p>Best regards,<br>Your Company</p>
                        </div>
                    </div>
                </body>
                </html>
                '''

                # Send confirmation email
                send_mail(
                    'Confirm your registration',
                    '',
                    'noreply@gmail.com',
                    [employee.email],
                    fail_silently=False,
                    html_message=html_message
                )

                return JsonResponse({'message': 'User registered successfully. Please check your email to confirm your registration.'}, status=201)
            else:
                return JsonResponse({'error': 'Employee does not exist. Check your ID.'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)

    def patch(self, request: Request):
        user_id = json.loads(request.body)['user_id']
        text = ""
        if (user_id):
            try:
                user = CustomUser.objects.get(id=user_id)
                text = 'deactivate' if user.is_active else 'activate'
                user.is_active = False if user.is_active else True
                user.save()
                return Response(data=MegaUserSerializer(user).data, status=200)
            except CustomUser.DoesNotExist:
                return JsonResponse({'error': 'User does not exist.'}, status=400)
            except:
                return JsonResponse({'error': 'Something went wrong'}, status=400)
        else:
            return JsonResponse({'error': f'Cannot {text} user'}, status=400)



class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        try:
            data = super().post(request=request)
            user = CustomUser.objects.get(username=request.data['username'])
            employee = get_object_or_404(Employee, user=user)
            profile_picture = user.profile_pictures.all().last()
            if employee:
                data.data['employee'] = EmployeeSerializer(employee).data
                data.data['username'] = user.username
                if not user.role:
                    user.role = Role.objects.get(name="user")
                    user.save()
                data.data["role"] = user.role.name,
                data.data["profile_picture"] = profile_picture.profile_picture.url if profile_picture else "http://127.0.0.1:8000/media/photos/profile.png",
                data.data["employee_id"] = employee.id,
                data.data["user_id"] = user.id,
                data.data["error"] = "No profile picture uploaded"
            else:
                return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
            return Response(data=data.data, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RoleManager:

    @staticmethod
    def add_role(user: CustomUser, position: str):
        groups = []
        if position.strip() == "Clerk":
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

        elif position.strip() == "System Administrator":
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
