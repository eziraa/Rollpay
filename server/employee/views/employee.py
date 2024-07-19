
# Restframework packages
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView

#  Django modules
from django.http import JsonResponse
from django.contrib.contenttypes.models import ContentType
from django.core.files.storage import default_storage
import json
import datetime
from month import Month

# Local modules
from employee.serializers.employee import EmployeeSerializer, AdminEmployeeSerializer
from employee.serializers.position import PositionSerializer
from employee.permissions.clerk_permission import IsUserInGroupWithClerk
from employee.serializers.payment import MonthlyPaymentSerializer
from employee.views.utils.pagination import StandardResultsSetPagination
from ..models import *


class EmployeeView (APIView):
    permission_classes = [IsUserInGroupWithClerk]

    def get(self, request: Request, employee_id=None, format=None):
        try:
            # employees = Employee.objects.all()
            # for employee in employees:
            #     employee.position.clear()
            #     if employee.user:
            #         if employee.user.role.name == 'Clerk':
            #             employee.position.add(
            #                 random.choice(Position.objects.filter(position_name="Clerk")))
            #             employee.save()
            #         elif employee.user.role.name == 'sys_admin':
            #             employee.position.add(
            #                 random.choice(Position.objects.filter(position_name="System Administrator")))
            #             employee.save()
            #         employee.position.add(
            #             random.choice(Position.objects.exclude(position_name="System Administrator").exclude(position_name="Clerk")))
            #         employee.save()
            #     else:
            #         employee.position.add(
            #             random.choice(Position.objects.exclude(position_name="System Administrator").exclude(position_name="Clerk")))
            #         employee.save()
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
            data.pop('position')
            employee = Employee.objects.create(**data)
            employee.position.add(position)
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

        def finished():
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

        def add_to_employee(year, month):
            if allowance_type:
                if not SalaryManager.add_allowance(allowance_type, month=Month(int(year), int(month)), employee=employee):
                    return JsonResponse({'error': 'This allowance already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return finished()
            elif deduction_type:
                if not SalaryManager.add_deduction(deduction_type, month=Month(int(year), int(month)), employee=employee):
                    return JsonResponse({'error': 'This deduction already exists in this employee'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return finished()
            elif overtime_type:
                if not SalaryManager.add_overtime(overtime_type=overtime_type, employee=employee, month=Month(int(year), int(month)), start_time=request.data['start_time'], end_time=request.data['end_time']):
                    return JsonResponse({'error': 'Adding overtime failed'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return finished()
        now = datetime.datetime.now()
        year = request.query_params['year']
        curr_month = request.query_params['month']
        if year != "undefined":
            year = int(year)
            if curr_month != "undefined":
                curr_month = int(curr_month)
                return add_to_employee(year, curr_month)
            else:
                for month in range(1, 13):
                 return add_to_employee(year, month)
        elif curr_month != "undefined":
            curr_month = int(curr_month)
            return add_to_employee(now.year, curr_month)
        else:
            return add_to_employee(now.year, now.month)


    def delete(self, request, employee_id):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            serializer = EmployeeSerializer(employee)
            employee_data = serializer.data  
            employee.delete()
            return Response(employee_data, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, employee_id, asset_type=None, asset_id=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if asset_type:
            year = request.query_params['year']
            curr_month = request.query_params['month']
            asset_id = int(asset_id)
            if year != "undefind" and curr_month != "undefined":
                curr_month = Month(int(year), int(curr_month))
                payments = Payment.objects.filter(
                    employee_id=employee_id, month=curr_month)
                if payments.exists():
                    payment = payments.first()

                    def remove_allowance():
                        allowance_to_remove = payment.allowances.filter(
                            id=asset_id).first()
                        if allowance_to_remove:
                            allowance_to_remove.delete()
                            payment.save()
                            serializer = MonthlyPaymentSerializer(
                                payments, many=True)
                            data = {
                                **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                                'payments': serializer.data,
                            }
                            return Response(data=data, status=status.HTTP_200_OK)
                        else:
                            return Response({"error": "Allowance cann't be removed"}, status=status.HTTP_400_BAD_REQUEST)

                    def remove_deduction():
                        deduction_to_remove = payment.deductions.filter(
                            id=asset_id).first()
                        if deduction_to_remove:
                            deduction_to_remove.delete()
                            payment.save()
                            serializer = MonthlyPaymentSerializer(
                                payments, many=True)
                            data = {
                                **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                                'payments': serializer.data,
                            }
                            return Response(data=data, status=status.HTTP_200_OK)
                        else:
                            return Response({"error": "Deduction cann't be removed"}, status=status.HTTP_400_BAD_REQUEST)

                    def remove_overtime():
                        overtime_to_remove = payment.overtimes.filter(
                            id=asset_id).first()
                        if overtime_to_remove:
                            overtime_to_remove.delete()
                            payment.save()
                            serializer = MonthlyPaymentSerializer(
                                payments, many=True)
                            data = {
                                **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                                'payments': serializer.data,
                            }
                            return Response(data=data, status=status.HTTP_200_OK)
                        else:
                            return Response({"error": "overtime cann't be removed"}, status=status.HTTP_400_BAD_REQUEST)

                    return remove_allowance() if asset_type == "allowance" else remove_deduction() if asset_type == "deduction" else remove_overtime() if asset_type == "overtime" else Response({"error": "Please have year and month to remove "}, status=status.HTTP_400_BAD_REQUEST)

                else:
                    return Response({"error": "No payment found for this month"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"error": "Please have year and month to remove "}, status=status.HTTP_400_BAD_REQUEST)
        else:        
            serializer = EmployeeSerializer(employee, request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
          





class PositionView(APIView):
    def get(self, request):
        position_serializer = PositionSerializer(
            Position.objects.all(), many=True)
        return JsonResponse(data=position_serializer.data, safe=False)


class SalaryManager:

    @staticmethod
    def add_allowance(allowance_type: str, month: Month, employee: Employee):
        allowance = Allowance.objects.get(allowance_type=allowance_type)
        emp_payment = Payment.objects.filter(
            month=month, employee=employee)
        if emp_payment.exists():
            payment = emp_payment.first()
            if payment.allowances.filter(allowance=allowance).exists():
                return False
            else:
                allowance_item = AllowanceItem.objects.create(
                    allowance=allowance, payment=payment)
                allowance_item.save()

        else:
            payment = Payment.objects.create(
                employee=employee, month=month, salary=employee.salaries.all().last().basic_salary)
            payment.save()
            allowance_item = AllowanceItem.objects.create(
                allowance=allowance, payment=payment)
            allowance_item.save()

        return True


    @staticmethod
    def add_deduction(deduction_type: str, month: Month, employee: Employee):
        deduction = Deduction.objects.get(deduction_type=deduction_type)
        emp_payment = Payment.objects.filter(
            month=month, employee=employee)
        if emp_payment.exists():
            payment = emp_payment.first()
            if payment.deductions.filter(deduction=deduction).exists():
                return False
            else:
                deduction_item = DeductionItem.objects.create(
                    deduction=deduction, payment=payment)
                deduction_item.save()

        else:
            payment = Payment.objects.create(
                employee=employee, month=month, salary=employee.salaries.all().last().basic_salary)
            payment.save()
            deduction_item = DeductionItem.objects.create(
                deduction=deduction, payment=payment)
            deduction_item.save()

        return True

    @staticmethod
    def add_overtime(overtime_type: str, month: Month, employee: Employee, start_time: str, end_time: str):
        overtime = Overtime.objects.get(overtime_type=overtime_type)
        emp_payment = Payment.objects.filter(
            month=month, employee=employee)
        if emp_payment.exists():
            payment = emp_payment.first()
            OvertimeItem.objects.create(
                overtime=overtime, start_time=start_time, end_time=end_time, payment=payment)
            payment.save()
        return True


class AdminAPIView(APIView):

    def get(self, request, *args, **kwargs):
        employees = Employee.objects.all()
        return Response(AdminEmployeeSerializer(employees, many=True).data, status= 200)

    def delete(self, request: Request, employee_id=None, *args, **kwargs):
        if employee_id is not None:
            employee = Employee.objects.filter(id=employee_id)
            if employee.exists():
                employee.delete()
                return Response({'message': 'Employee deleted'}, status=200)
            else:
                return Response({'error': 'Employee not found'}, status=404)
        else:
            data = json.loads(request.body)
            employees_id = data.get('employees', [])
            if employees_id is not None:
                employees = Employee.objects.filter(id__in=employees_id)
                if employees.exists():
                    employees.delete()
                    return Response(AdminEmployeeSerializer(Employee.objects.all(), many=True).data, status=200)
                else:
                    return Response({'error': 'Employee not found'}, status=404)

            return Response({'error': 'Employee id not provided'}, status=400)
