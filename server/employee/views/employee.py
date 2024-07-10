
# Restframework packages
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView

#  Django modules
from django.http import JsonResponse
from django.core.files.storage import default_storage
import json
import datetime
from month import Month

# Local modules
from employee.serializers.employee import EmployeeSerializer
from employee.serializers.position import PositionSerializer
from employee.permissions.clerk_permission import IsUserInGroupWithClerk
from employee.serializers.payment import MonthlyPaymentSerializer
from employee.views.utils.pagination import StandardResultsSetPagination
from ..models import Employee, Payment, Salary, Position, Allowance, Deduction, OvertimeItem, Overtime


class EmployeeView (APIView):
    permission_classes = [IsUserInGroupWithClerk]

    def get(self, request: Request, employee_id=None, format=None):
        try:
            if employee_id:
                employee = Employee.objects.get(id=employee_id)
                serializer = EmployeeSerializer(employee)
                return Response(serializer.data, status=200)
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
            employee = Employee.objects.create(**data)
            employee.save()
            salary = Salary.objects.create(
                basic_salary=position.basic_salary, employee=employee)
            data['salary'] = salary.basic_salary
            serializer = EmployeeSerializer(employee, data=data)
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({'error': 'Required field(s) missing in request data'}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request: Request, employee_id, allowance_type=None, overtime_type=None, deduction_type=None, position_name=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)

        def add_to_employee(year, month):
            if allowance_type:
                if not SalaryManager.add_allowance(allowance_type, month=Month(int(year), int(month)), employee=employee):
                    return JsonResponse({'error': 'This allowance already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
            elif deduction_type:
                if not SalaryManager.add_deduction(deduction_type, month=Month(int(year), int(month)), employee=employee):
                    return JsonResponse({'error': 'This deduction already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)

            elif overtime_type:
                if not SalaryManager.add_overtime(overtime_type=overtime_type, employee=employee, month=Month(int(year), int(month)), start_time=request.data['start_time'], end_time=request.data['end_time']):
                    return JsonResponse({'error': 'This overtime already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)

        now = datetime.datetime.now()
        year = request.query_params['year']
        curr_month = request.query_params['month']
        if year != "undefined":
            year = int(year)
            if curr_month != "undefined":
                curr_month = int(curr_month)
                add_to_employee(year, curr_month)
            else:
                for month in range(1, 13):
                    add_to_employee(year, month)
        elif curr_month != "undefined":
            curr_month = int(curr_month)
            add_to_employee(now.year, curr_month)
        else:
            add_to_employee(now.year, now.month)

        payments = Payment.objects.filter(
            employee_id=employee_id, month=Month(now.year, now.month))
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

        if employee.salaries.count() > 0:

            salary = employee.salaries.all().last()
            salary.basic_salary = data['salary']
            salary.save()
        else:
            salary = Salary.objects.create(
                basic_salary=data['salary'], employee=employee)
            salary.save()
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


class SalaryManager:

    @staticmethod
    def add_allowance(allowance_type: str, month: Month, employee: Employee):
        emp_payment = Payment.objects.filter(
            month=month, employee=employee)
        if emp_payment.exists():
            if emp_payment.first().allowances.filter(allowance_type=allowance_type).exists():
                return JsonResponse({'error': 'This allowance already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                emp_payment.first().allowances.add(
                    Allowance.objects.get(allowance_type=allowance_type))
                emp_payment.first().save()
        else:
            payment = Payment.objects.create(
                employee=employee, month=month, salary=employee.salaries.all().last().basic_salary)
            payment.allowances.add(
                Allowance.objects.get(allowance_type=allowance_type))
            payment.save()

    @staticmethod
    def add_deduction(deduction_type: str, month: Month, employee: Employee):
        emp_payment = Payment.objects.filter(
            month=month, employee=employee)
        if emp_payment.exists():
            if emp_payment.first().deductions.filter(deduction_type=deduction_type).exists():
                return False
            else:
                emp_payment.first().deductions.add(
                    Deduction.objects.get(deduction_type=deduction_type))
                emp_payment.first().save()
        else:
            payment = Payment.objects.create(
                employee=employee, month=month, salary=employee.salaries.all().last().basic_salary)
            payment.deductions.add(
                Deduction.objects.get(deduction_type=deduction_type))
            payment.save()

            return True

    @staticmethod
    def add_overtime(overtime_type: str, month: Month, employee: Employee, start_time: str, end_time: str):
        overtime = Overtime.objects.get(overtime_type=overtime_type)
        emp_payment = Payment.objects.filter(
            month=month, employee=employee)
        if emp_payment.exists():
            payment = emp_payment.first()
            if payment.overtimes.filter(overtime=overtime).exists():
                return JsonResponse({'error': 'This overtime already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                payment.overtimes.add(OvertimeItem.objects.create(
                    overtime=overtime, start_time=start_time, end_time=end_time))

                payment.save()
