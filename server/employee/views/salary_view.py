from datetime import date
import json
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from django.http.response import JsonResponse
from employee.utils.search import Search
from employee.utils.salary_calculator import SalaryCalculator
from employee.serializers.employee import EmployeeSerializer
from employee.serializers.payment import PaymentSerializer, MonthlyPaymentSerializer
from employee.views.views import StandardResultsSetPagination
from ..models import Employee, Payment, Salary
import month
from django.db.models import Avg


class SalaryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request: Request, employee_id=None, year=None, curr_month=None):
        if employee_id:
            payments = Payment.objects.filter(employee_id=employee_id)
            if payments.exists():
                if curr_month and year:
                    try:
                        queryset = payments.filter(
                            month=month.Month((year), month=curr_month))
                        paginator = StandardResultsSetPagination()
                        paginator.page_size = request.query_params.get(
                            "page_size", 20)
                        page = paginator.paginate_queryset(
                            queryset, request)
                        if page is not None:
                            serializer = PaymentSerializer(page, many=True)
                            return paginator.get_paginated_response(serializer.data)
                        serializer = MonthlyPaymentSerializer(
                            payments, many=True)
                        data = {
                            **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                            'payments': serializer.data,

                        }
                        return Response(data)

                    except Exception as e:
                        return JsonResponse({"error": str(e)}, status=400)
                else:
                    serializer = MonthlyPaymentSerializer(
                        payments, many=True)
                    data = {
                        **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                        'payments': serializer.data,

                    }
                    return Response(data)
            else:
                employee = Employee.objects.get(pk=employee_id)
                for year in range(2022, 2025):
                    for curent_month in range(1, 13):
                        curr_month = month.Month(year, curent_month)
                        payment = Payment.objects.create(
                            employee=employee, month=curr_month, salary=employee.salary)
                        payment.save()
                payments = Payment.objects.filter(employee_id=employee_id)
                if payments.exists():
                    serializer = MonthlyPaymentSerializer(
                        payments, many=True)
                    data = {
                        **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                        'payments': serializer.data,

                    }
                    return Response(data)
                else:
                    return JsonResponse({"error": "No payments found for the given employee ID"}, status=404)
        elif curr_month and year:
            try:
                queryset = Payment.objects.filter(
                    month=month.Month((year), month=curr_month))
                paginator = StandardResultsSetPagination()
                paginator.page_size = request.query_params.get(
                    "page_size", 20)
                page = paginator.paginate_queryset(queryset, request)
                if page is not None:
                    serializer = PaymentSerializer(page, many=True)
                    return paginator.get_paginated_response(serializer.data)
                serializer = PaymentSerializer(queryset, many=True)
                return JsonResponse(data=serializer.data, safe=False)

            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
        else:
            try:
                # employees = Employee.objects.all()
                # for employee in employees:
                #     for year in range(2022, 2025):
                #         for curent_month in range(1, 13):
                #             curr_month = month.Month(year, curent_month)
                #             payment = Payment.objects.create(
                #                 employee=employee, month=curr_month, salary=employee.salary)
                #             payment.save()
                queryset = Payment.objects.all().order_by("month")
                # my_month = month.Month(2024, 4)
                # queryset = queryset.filter(month__lt=my_month)
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

class BasicSalaryAverage(APIView):
     def get(self, request: Request,format=None):
        try:
            average_basic_salary = Salary.objects.aggregate(avg_basic_salary=Avg('basic_salary'))['avg_basic_salary']

            return Response({"avg_basic_salary": '{:.2f}'.format(average_basic_salary)})
        except Exception as e:
            return Response({"error": str(e)}, status=400)
class TotalIncomeTax(APIView):
    def get(self, request: Request):
        calculator = SalaryCalculator()

        current_month_total_income_tax = calculator.calc_income_tax_current_month()

        data = {
            'total_income_tax': current_month_total_income_tax
        }

        return JsonResponse(data)

