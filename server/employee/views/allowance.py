from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView
from ..models import Allowance
from employee.serializers.allowance import AllowanceSerializer
from django.http import JsonResponse
import json
from employee.views.utils.pagination import StandardResultsSetPagination
import datetime

class AllowanceView (APIView):

    def get(self, request: Request, allowance_id=None,format=None):
        try:
            if allowance_id:
                allowance = Allowance.objects.get(id=allowance_id)
                serializer = AllowanceSerializer(allowance)
                return Response(serializer.data)

            queryset = Allowance.objects.all().order_by("pk")
            paginator = StandardResultsSetPagination()
            paginator.page_size = request.query_params.get("page_size", 10)
            page = paginator.paginate_queryset(queryset, request)
            if page is not None:
                serializer = AllowanceSerializer(page, many=True)
                return paginator.get_paginated_response(serializer.data)
            serializer = AllowanceSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def post(self, request):
        try:
            data = json.loads(request.body)
            if Allowance.objects.filter(allowance_type=data['allowance_type']).exists():
                return JsonResponse({'error': 'Allowance already exists'}, status=status.HTTP_400_BAD_REQUEST)
            allowance = Allowance.objects.create(**data)
            serializer = AllowanceSerializer(allowance, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({'error': 'Required field(s) missing in request data'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, allowance_id):
        try:
            allowance = Allowance.objects.get(pk=allowance_id)
        except Allowance.DoesNotExist:
            return Response({"error": "Allowance not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = AllowanceSerializer(allowance)
            allowance.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, allowance_id):
        try:
            allowance = Allowance.objects.get(pk=allowance_id)
        except allowance.DoesNotExist:
            return Response({"error": "allowance not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            allowance_type = request.data["allowance_type"]
            allowance_rate = request.data["allowance_rate"]
            if allowance_type and allowance_rate:
                allowance.allowance_type = allowance_type
                allowance.allowance_rate = allowance_rate
                allowance.save()
                serializer = AllowanceSerializer(allowance)
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Check your data to edit"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({"error": "Checkyour data bad request"}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, allowance_id):
        try:
            allowance = Allowance.objects.get(pk=allowance_id)
        except allowance.DoesNotExist:
            return Response({"error": "allowance not found"}, status=status.HTTP_404_NOT_FOUND)

        allowance.end_at = None if allowance.end_at else datetime.datetime.now()
        allowance.save()
        serializer = AllowanceSerializer(allowance)

        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
