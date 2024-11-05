from datetime import date
import random
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from django.http.response import JsonResponse
from month import Month
from employee.views.raise_s import raise_salaries, change_employee_positions
from employee.utils.search import Search
from employee.serializers.employee import EmployeeSerializer
from employee.serializers.payment import PaymentSerializer, MonthlyPaymentSerializer
from employee.views.employee import StandardResultsSetPagination
from ..models import Employee, Payment, Salary, Allowance, Overtime, OvertimeItem, Deduction, DeductionItem, AllowanceItem
import month
import datetime
from employee.serializers import start_p
class PaymentView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request: Request):
        # raise_salaries()
        # change_employee_positions()
        # employees = Employee.objects.all()
        # for employee in employees:
        #     salaries = Salary.objects.filter(employee=employee)
        #     for i in range(len(salaries)):
        #         curr_salary = salaries[i]
        #         if i == 0:
        #             curr_salary.start_date = datetime.date(year=2022, month=1, day=1)
        #             curr_salary.save()
        #             continue
        #         prev_salary = salaries[i-1]
        #         curr_salary.start_date = prev_salary.end_date
        #         curr_salary.save()

        return Response("success", status=200)
    def post(self, request: Request, employee_id=None, year=None, curr_month=None):
        if employee_id:
            employee = Employee.objects.get(id=employee_id)
            curr_month = curr_month if curr_month is not None else 13
            if year and curr_month:
               res = self.create_payment(employee=employee,
                                         month=month.Month(year, curr_month))
               if res:
                   return Response("success", status=201)
               else:
                   return Response("error", status=404)
            elif year:
                for curent_month in range(1, 13):
                    curr_month = month.Month(year, curent_month)
                    self.create_payment(
                        employee=employee, month=curr_month)
            else:
                for year in range(2022, 2025):
                    for curr_month in range(1, 13):
                      self.create_payment(employee, month=curr_month)
        else:
            # change_employee_positions()

            # raise_salaries()

            # months = [Month(year=year, month=month) for month in range(1, 13 if year != 2025 else 11) for year in range(2022, 2025)]
            # for month in months:
            #     start_p.start_payment(month)

            # employees = Employee.objects.all()
            # for employee in employees:
            #     if not employee.user:
            #         continue
            #     payments = Payment.objects.filter(
            #         employee=employee, month__gte=(month.Month(year=2023, month=11)))
            #     for payment in payments:
            #         start_p.add_assets(payment=payment)
            #         payment.save()

            #

            # Randomize payment dates for the last 5 days of the month
            # today = datetime.datetime.today()
            # curent_month = month.Month(year=today.year, month=today.month)
            # payments = Payment.objects.filter(month__lt=curent_month)
            # for payment in payments:
            #     random_day = random.choice([i for i in range(
            #         payment.month.last_day().day - 4, payment.month.last_day().day + 1)])
            #     payment.payment_date = datetime.date(day=random_day, month=payment.month.month, year=payment.month.year)
            #     payment.save()
            #     print(payment.payment_date)

            employees = Employee.objects.all()
            for employee in employees:
                salaries = employee.salaries.all()
                for i in range(len(salaries)):
                    salary = salaries[i]
                    if i == 0:
                        salary.start_date = datetime.date(
                            year=2022, month=1, day=1)
                        continue
                    salary.start_date = salaries[i-1].end_date
                    salary.save()
            return Response("success", status=201)
    def patch(self, request, month=None, employee_id=None):
        try:
            if month:
                payments = Payment.objects.filter(month=month)
            else:
                return Response({"error": "month not provided"}, status=status.HTTP_400_BAD_REQUEST)
            if employee_id:
                payments = payments.filter(employee_id=employee_id)
        except payments.DoesNotExist:
            return Response({"error": "payment not found"}, status=status.HTTP_404_NOT_FOUND)
        
        for payment in payments:
            if payment.payment_date == None:
                payment.payment_date = datetime.datetime.now().date()
            elif payment.payment_date and employee_id:
                payment.payment_date = None
            payment.save()
        queryset = Payment.objects.filter(month=month)
        paginator = StandardResultsSetPagination()
        paginator.page_size = request.query_params.get(
            "page_size", 10)
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = PaymentSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = PaymentSerializer(queryset, many=True)
        return Response(data=serializer.data, safe=False)
    def create_payment(self, employee: Employee, month: month.Month):
        if Payment.objects.filter(employee=employee, month=month).exists():
            return False


        salary = Salary.objects.create(
            basic_salary=employee.salary.basic_salary, allowances=All, overtimes=employee.salary.overtimes, deductions=employee.salary.deductions)
        salary.save()
        now = date.today()
        payment = Payment.objects.create(
            salary=salary,
            employee=employee,
            month=month.Month(now.year, now.month)
        )
        payment = Payment.objects.create(
            employee=employee, month=month, salary=employee.salary)
        payment.save()
        return True
