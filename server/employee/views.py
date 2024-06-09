from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import HttpRequest
from rest_framework import status
from .serializer import EmployeeSerializer, ProfilePicSerializer
from .models import Employee
# Create your views here.

@api_view(['POST'])
def add_employee(request: HttpRequest):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Could not create employee"}, status=status.HTTP_400_BAD_REQUEST)
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
    