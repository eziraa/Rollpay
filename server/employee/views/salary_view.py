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
from employee.views.views import StandardResultsSetPagination
from ..models import Employee, Payment
import month

class SalaryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request: Request, employee_id=None):
        if employee_id:
            # Logic for handling request with employee_id
            payments = Payment.objects.filter(employee_id=employee_id)
            if payments.exists():
                serializer = MonthlyPaymentSerializer(payments, many=True)
                data = {
                    **EmployeeSerializer(Employee.objects.get(pk=employee_id)).data,
                    'payments': serializer.data,

                }
                return Response(data)
            else:
                return JsonResponse({"error": "No payments found for the given employee ID"}, status=404)
        else:
            try:
                queryset = Payment.objects.all().order_by("month")
                my_month = month.Month(2024, 4)
                queryset = queryset.filter(month__lt=my_month)
                paginator = StandardResultsSetPagination()
                paginator.page_size = request.query_params.get(
                    "page_size", 100)
                page = paginator.paginate_queryset(queryset, request)
                if page is not None:
                    serializer = PaymentSerializer(page, many=True)
                    return paginator.get_paginated_response(serializer.data)
                serializer = PaymentSerializer(queryset, many=True)
                return JsonResponse(data=serializer.data, safe=False)

            except Exception as e:
                return JsonResponse({"error": str(e)}, status=400)
