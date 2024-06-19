from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from .serializer import EmployeeSerializer
from .models import Employee, Salary
from .utils import refresh_jwt_token
from .permissions import IsUserInGroupWithClerk
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


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # Define how many items per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class EmployeeView (APIView):
    permission_classes = [IsUserInGroupWithClerk]
    def get(self, request: Request, format=None):
        try:
            queryset = Employee.objects.all().order_by("pk")
            paginator = StandardResultsSetPagination()
            page = paginator.paginate_queryset(queryset, request)
            if page is not None:
                serializer = EmployeeSerializer(page, many=True)
                return paginator.get_paginated_response(serializer.data)
            serializer = EmployeeSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
    def post(self, request):
        try:
            data = json.loads(request.body)
            if Employee.objects.filter(email=data['email']).exists():
                return JsonResponse({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            employee = Employee.objects.last()
            if employee:
                data['id'] = Employee.generate_employee_id(employee.id)
            else:
                data['id'] = "ED1000"
            salary = Salary.objects.create(
                basic_salary=data['salary'])
            data['salary'] = salary
            employee = Employee.objects.create(**data)
            employee.save()
            serializer = EmployeeSerializer(employee, data=data)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({'error': 'Required field(s) missing in request data'}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            employe = Employee.objects.get(pk=id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = EmployeeSerializer(employe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, employee_id):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = EmployeeSerializer(employee)
            employee.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, employee_id):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        data = json.loads(request.body)
        salary = Salary.objects.create(
            basic_salary=data['salary'])
        employee.salary = salary
        data.pop('salary', None)  # Use pop to remove 'salary' safely
        serializer = EmployeeSerializer(employee, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


class SalaryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(data=serializer.data, safe=False)
