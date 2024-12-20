from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView

from employee.serializers.overtime import OvertimeSerializer
from ..models import Overtime
from django.http import JsonResponse
import json
from employee.views.utils.pagination import StandardResultsSetPagination


class OvertimeView (APIView):

    def get(self, request: Request,overtime_id=None, format=None):
        try:
            if overtime_id:
                overtime  = Overtime.objects.get(id=overtime_id)
                serializer = OvertimeSerializer(overtime)
                return Response(serializer.data)
            is_active = request.query_params.get("is_active", None)
            if is_active:
                queryset = Overtime.objects.filter(
                    end_at__isnull=True).order_by("pk")
                serializer = OvertimeSerializer(queryset, many=True)
                return Response(serializer.data)
            queryset = Overtime.objects.all().order_by("pk")
            paginator = StandardResultsSetPagination()
            paginator.page_size = request.query_params.get("page_size", 10)
            page = paginator.paginate_queryset(queryset, request)
            if page is not None:
                serializer = OvertimeSerializer(page, many=True)
                return paginator.get_paginated_response(serializer.data)
            serializer = OvertimeSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def post(self, request):
        try:
            data = json.loads(request.body)
            if Overtime.objects.filter(overtime_type=data['overtime_type']).exists():
                return JsonResponse({'error': 'Overtime already exists'}, status=status.HTTP_400_BAD_REQUEST)
            overtime = Overtime.objects.create(**data)
            serializer = OvertimeSerializer(overtime, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({'error': 'Required field(s) missing in request data'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, overtime_id):
        try:
            overtime = Overtime.objects.get(pk=overtime_id)
        except Overtime.DoesNotExist:
            return Response({"error": "Overtime not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = OvertimeSerializer(overtime)
            overtime.delete()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, overtime_id):
        try:
            overtime = Overtime.objects.get(pk=overtime_id)
        except Overtime.DoesNotExist:
            return Response({"error": "Overtime not found"}, status=status.HTTP_404_NOT_FOUND)
        data = json.loads(request.body)
        serializer = OvertimeSerializer(overtime, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
