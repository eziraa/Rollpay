from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from employee.serializers.employee import EmployeeSerializer, EmployementContractSerializer
from employee.serializers.position import PositionSerializer
from employee.permissions.clerk_permission import IsUserInGroupWithClerk
from employee.serializers.payment import MonthlyPaymentSerializer, PaymentSerializer
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from employee.serializers.salary import SalarySerializer
from ..models import Employee, Payment, Salary, Position, Allowance, Deduction, OvertimeItem, Overtime
from django.http import JsonResponse
from django.core.files.storage import default_storage
import os
import json
import datetime
from month import Month

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

    def patch(self, request, employee_id, allowance_type=None, overtime_type=None, deduction_type=None, position_name=None):
        try:
            employe = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        if allowance_type:
            if employe.salary.allowances.filter(allowance_type=allowance_type).exists():
                return JsonResponse({'error': 'This allowance already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                employe.salary.allowances.add(
                    Allowance.objects.get(allowance_type=allowance_type))
                employe.save()
                if not Payment.objects.filter(employee_id=employee_id, salary_id=employe.salary.id).exists():
                    payment = Payment.objects.create(employee=employe, month=Month(datetime.datetime.now(
                    ).year, datetime.datetime.now().month), salary=employe.salary)
                    payment.save()
        elif deduction_type:
            if employe.salary.deductions.filter(deduction_type=deduction_type).exists():
                return JsonResponse({'error': 'This deduction already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                employe.salary.deductions.add(
                    Deduction.objects.get(deduction_type=deduction_type))
                employe.save()
                if not Payment.objects.filter(employee_id=employee_id, salary_id=employe.salary.id).exists():
                    payment = Payment.objects.create(employee=employe, month=Month(datetime.datetime.now(
                    ).year, datetime.datetime.now().month), salary=employe.salary)
                    payment.save()
        elif overtime_type:
            overtime = Overtime.objects.get(overtime_type=overtime_type)
            if employe.salary.overtimes.filter(overtime=overtime).exists():
                return JsonResponse({'error': 'This overtime already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                employe.salary.overtimes.add(OvertimeItem.objects.create(
                    overtime=overtime, start_time=request.data["start_time"], end_time=request.data["end_time"]))

                employe.save()
                if not Payment.objects.filter(employee_id=employee_id, salary_id=employe.salary.id).exists():
                    payment = Payment.objects.create(employee=employe, month=Month(datetime.datetime.now(
                    ).year, datetime.datetime.now().month), salary=employe.salary)
                    payment.save()
        payments = Payment.objects.filter(employee_id=employee_id)
        if payments.exists():
            serializer = MonthlyPaymentSerializer(payments, many=True)
            data = {
                **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                'payments': serializer.data,
            }
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            return Response("serializer.errors", status=status.HTTP_400_BAD_REQUEST)

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

class EmployementContract(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request: Request, employee_id, format=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        employement_contract = request.data.get('employement_contract')
        if employement_contract:
            if employee.employement_contract:
                if default_storage.exists(employee.employement_contract.name):
                    default_storage.delete(employee.employement_contract.name)
            employee.employement_contract = employement_contract

            employee.save()
            return Response({"message": "Employment contract updated successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Employment contract not updated "}, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, employee_id, format=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = EmployeeSerializer(employee)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DocumentView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, employee_id, format=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        document = request.data.get('document')
        if document:
            if employee.document:
                if default_storage.exists(employee.document.name):
                    default_storage.delete(employee.document.name)

            employee.document = document
            employee.save()

        # serializer = EmployeeSerializer(employee, data=request.data)
        # if serializer.is_valid():
        #     serializer.save()
            return Response({"message": "Document uploaded successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Error occurred"}, status=status.HTTP_400_BAD_REQUEST)
