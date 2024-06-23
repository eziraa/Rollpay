from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from django.http.response import JsonResponse
from employee.utils.search import Search
from employee.serializers.serializers import SalaryEmployeeSerializer
from ..models import Employee


class SalaryView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request: Request):
        search_by = request.query_params.get("search_by")
        search_value = request.query_params.get("search_value")
        if search_by and search_value:
            employees = Search().search(search_string=search_by, value=search_value)
        else:
            employees = Employee.objects.all()
        serializer = SalaryEmployeeSerializer(employees, many=True)
        return JsonResponse(data=serializer.data, safe=False)
