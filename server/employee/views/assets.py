from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView
from employee.serializers.employee import EmployeeSerializer
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from ..models import Employee, Asset
from django.core.files.storage import default_storage


class EmployeeAssetView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request: Request, employee_id, format=None):
        try:
            employee = Employee.objects.get(pk=employee_id)
        except Employee.DoesNotExist:
            return Response({"error": "Employee not found"}, status=status.HTTP_404_NOT_FOUND)
        agreement_doc = request.data.get('employement_contract')
        if agreement_doc:

            if Asset.objects.filter(employee=employee, asset_name="agreement_doc").exists():
                asset = Asset.objects.filter(
                    employee=employee, asset_name="agreement_doc")
                if default_storage.exists(asset.asset_value):
                    default_storage.delete(asset.asset_value)
                asset.delete()

            asset = Asset.objects.create(
                employee=employee, asset_name="agreement_doc", asset_value=agreement_doc)
            asset.save()

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
