from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.request import HttpRequest
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializer import EmployeeSerializer, ProfilePicSerializer
from .models import Employee
# Assuming you have a utility function to refresh tokens
from .utils import refresh_jwt_token
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json


@api_view(['POST'])
def refresh_token(request):
    old_token = request.data.get('token')
    new_token = refresh_jwt_token(old_token)
    if new_token:
        return Response({"token": new_token})
    else:
        return Response({"error": "Invalid token"}, status=400)
# Create your views here.
# @api_view(['POST'])


@csrf_exempt
@require_http_methods(["POST"])
@permission_classes([IsAuthenticated])
def add_employee(request):
    try:
        data = json.loads(request.body)
        if Employee.objects.filter(email=data['email']).exists():
            return JsonResponse({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = EmployeeSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'Employee registered successfully'}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except KeyError:
        return JsonResponse({'error': 'Required field(s) missing in request data'}, status=status.HTTP_400_BAD_REQUEST)
    






@api_view(['PATCH'])
def update_employee(request, id):
    try:
        employe = Employee.objects.get(pk=id)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = EmployeeSerializer(instance=employe, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def upload_profile_pic(request, id):
    try:
        employe = Employee.objects.get(pk=id)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProfilePicSerializer(instance=employe, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Could not upload profile picture"}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_profile_pic(request, id):
    try:
        employe = Employee.objects.get(pk=id)
    except Employee.DoesNotExist:
        return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ProfilePicSerializer(employe)

    return Response(serializer.data)
    