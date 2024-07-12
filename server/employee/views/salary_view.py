from datetime import date
import json
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from django.http.response import JsonResponse
from employee.utils.search import Search
from employee.serializers.employee import EmployeeSerializer
from employee.serializers.payment import PaymentSerializer, MonthlyPaymentSerializer
from employee.views.employee import StandardResultsSetPagination
from ..models import *
import month


class SalaryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request: Request, employee_id=None, year=None, curr_month=None):
        if employee_id:
            payments = Payment.objects.filter(employee_id=employee_id)
            if payments.exists():
                if curr_month and year:
                    try:
                        payments = payments.filter(
                            month=month.Month((year), month=curr_month))
                    except Exception as e:
                        return JsonResponse({"error": str(e)}, status=400)
                serializer = MonthlyPaymentSerializer(payments, many=True)
                data = {
                    **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                    'payments': serializer.data,

                }
                return Response(data)
            else:
            #     employee = Employee.objects.get(pk=employee_id)
            #     for year in range(2022, 2025):
            #         for curent_month in range(1, 13):
            #             curr_month = month.Month(year, curent_month)
            #             payment = Payment.objects.create(
            #                 employee=employee, month=curr_month, salary=employee.salaries.all().last().basic_salary,
            #             )
            #             payment.save()
            #     payments = Payment.objects.filter(employee_id=employee_id)
            #     if payments.exists():
            #         serializer = MonthlyPaymentSerializer(payments, many=True)
            #         data = {
            #             **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
            #             'payments': serializer.data,

            #         }
            #         return Response(data)
            #     else:
                 return JsonResponse({"error": "No payments found for the given employee ID"}, status=404)

        else:
            try:
                # employees = Employee.objects.all()
                # for employee in employees:
                #     for year in range(2022, 2025):
                #         for curent_month in range(1, 13):
                #             if year < 2024 or curent_month <= 7:
                #                 curr_month_temp = month.Month(
                #                     year, curent_month)
                #                 if Payment.objects.filter(month=curr_month_temp, employee=employee).exists():
                #                     payment = Payment.objects.filter(
                #                         month=curr_month_temp, employee=employee).first()
                #                 else:
                #                     payment = Payment.objects.create(
                #                         employee=employee, month=curr_month_temp, salary=employee.salaries.all().last().basic_salary)
                #                     payment.save()
                #                 for allowance in Allowance.objects.all():
                #                     if payment.allowances.filter(allowance=allowance):
                #                         continue
                #                     allowance = AllowanceItem.objects.create(
                #                         allowance=allowance, payment=payment)
                #                     allowance.save()
                #                 for overtime in Overtime.objects.all():
                #                     print(overtime)
                #                     if payment.overtimes.filter(overtime=overtime):
                #                         continue
                #                     start_at = datetime.datetime.now()
                #                     end_at = start_at.replace(
                #                         hour=start_at.hour + random.choice([1, 2, 3, 4, 5, 6, 7, 8, 9]))
                #                     overtime = OvertimeItem.objects.create(
                #                         overtime=overtime, payment=payment, start_time=start_at, end_time=end_at)
                #                 for deduction in Deduction.objects.all():
                #                     if payment.deductions.filter(deduction=deduction):
                #                         continue
                #                     deduction = DeductionItem.objects.create(
                #                         deduction=deduction, payment=payment)
                #                     deduction.save()
                #             else:
                #                 break
                queryset = Payment.objects.all().order_by("month")
                if curr_month and year:
                    try:
                        queryset = queryset.filter(
                            month=month.Month((year), month=curr_month))
                    except Exception as e:
                        return JsonResponse({"error": str(e)}, status=400)
                paginator = StandardResultsSetPagination()
                paginator.page_size = request.query_params.get(
                    "page_size", 10)
                page = paginator.paginate_queryset(queryset, request)
                if page is not None:
                    serializer = PaymentSerializer(page, many=True)
                    return paginator.get_paginated_response(serializer.data)
                serializer = PaymentSerializer(queryset, many=True)
                return JsonResponse(data=serializer.data, safe=False)

            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
