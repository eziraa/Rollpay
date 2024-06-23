from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from employee.serializers.serializers import EmployeeSerializer, SalaryEmployeeSerializer, PositionSerializer
from employee.permissions.clerk_permission import IsUserInGroupWithClerk
from ..models import Employee, Salary, Position
from django.http import JsonResponse
import json


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
            paginator.page_size = request.query_params.get("page_size", 10)
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
            if Employee.objects.filter(phone_number=data['phone_number']).exists():
                return JsonResponse({'error': 'Phone Number already exists'}, status=status.HTTP_400_BAD_REQUEST)
            employee = Employee.objects.last()
            if employee:
                data['id'] = Employee.generate_employee_id(employee.id)
            else:
                data['id'] = "ED1000"
            if not Position.objects.filter(position_name=data['position']).exists():
                return JsonResponse({'error': 'Position does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            position = Position.objects.get(position_name=data['position'])
            salary = Salary.objects.create(
                basic_salary=position.basic_salary)
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

        if employee.salary:
            employee.salary.basic_salary = data['salary']
        else:
            salary = Salary.objects.create(
                basic_salary=data['salary'])
            employee.salary = salary
        data.pop('salary', None)  # Use pop to remove 'salary' safely
        serializer = EmployeeSerializer(employee, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)


class PositionView(APIView):
    def get(self, request):
        position_serializer = PositionSerializer(
            Position.objects.all(), many=True)
        return JsonResponse(data=position_serializer.data, safe=False)
