from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView
from employee.serializers.employee import EmployeeSerializer
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser

from employee.serializers.asset import AssetSerializer
from ..models import Employee, Asset
from django.core.files.storage import default_storage
from django.db.models import Q



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

class AssetList(APIView):
    def get(self, request, employee_id):
        assets = Asset.objects.filter(Q(employee_id=employee_id))
        serializer = AssetSerializer(assets, many=True)
        return Response(serializer.data)


class AssetDetail(APIView):
    def get(self, request, asset_id):
        asset = get_object_or_404(Asset, pk=asset_id)
        serializer = AssetSerializer(asset)
        return Response(serializer.data)

    def put(self, request, asset_id):
        asset = get_object_or_404(Asset, pk=asset_id)
        data = request.data.copy()
        if 'employee' not in data:
            data['employee'] = asset.employee.pk
        serializer = AssetSerializer(asset, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, asset_id):
        asset = get_object_or_404(Asset, pk=asset_id)
        asset.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AddAssetToEmployee(APIView):

    def post(self, request, employee_id):
        employee = get_object_or_404(Employee, pk=employee_id)
        data = request.data.copy()
        data['employee'] = employee.pk
        serializer = AssetSerializer(data=data)
        if serializer.is_valid():
            serializer.save(employee=employee)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)