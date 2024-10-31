

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
from employee.serializers.user import MegaUserSerializer
from employee.models import *


class AuthUserView(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request, user_id=None, *args, **kwargs):
        user_id = request.user.id
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
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
