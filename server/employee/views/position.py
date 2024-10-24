from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView
from ..models import Position
from employee.serializers.position import PositionSerializer
from django.http import JsonResponse
import json
from employee.views.utils.pagination import StandardResultsSetPagination
import datetime


class PositionView (APIView):

    def get(self, request: Request, position_id=None, format=None):
        try:
            if position_id:
                position = Position.objects.get(id=position_id)
                serializer = PositionSerializer(position)
                return Response(serializer.data)
            is_active = request.query_params.get("is_active", None)
            if is_active:
                queryset = Position.objects.filter(
                    end_date__isnull=True).order_by("pk")
                serializer = PositionSerializer(queryset, many=True)
                return Response(serializer.data)
            queryset = Position.objects.all().order_by("pk")
            paginator = StandardResultsSetPagination()
            paginator.page_size = request.query_params.get("page_size", 10)
            page = paginator.paginate_queryset(queryset, request)
            if page is not None:
                serializer = PositionSerializer(page, many=True)
                return paginator.get_paginated_response(serializer.data)
            serializer = PositionSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def post(self, request):
        try:
            data = json.loads(request.body)
            if Position.objects.filter(position_name=data['position_name']).exists():
                return JsonResponse({'error': 'Position already exists'}, status=status.HTTP_400_BAD_REQUEST)
            position = Position.objects.create(**data)
            serializer = PositionSerializer(position, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({'error': 'Required field(s) missing in request data'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, position_id):
        try:
            position = Position.objects.get(pk=position_id)
        except Position.DoesNotExist:
            return Response({"error": "Position not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = PositionSerializer(position)
            position.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, position_id):
        try:
            position = Position.objects.get(pk=position_id)
        except Position.DoesNotExist:
            return Response({"error": "Position not found"}, status=status.HTTP_404_NOT_FOUND)
        position.end_date = None if position.end_date else datetime.date.today()
        position.save()
        serializer = PositionSerializer(position)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, position_id):
        try:
            position = Position.objects.get(pk=position_id)
        except Position.DoesNotExist:
            return Response({"error": "Position not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            position_name = request.data["position_name"]
            basic_salary = request.data["basic_salary"]
            if position_name and basic_salary:
                position.position_name = position_name
                position.basic_salary = basic_salary
                position.save()
                serializer = PositionSerializer(position)
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Check your data to edit"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({"error": "Checkyour data bad request"}, status=status.HTTP_400_BAD_REQUEST)

    
class PositionNumber(APIView):
     def get(self, request: Request,format=None):
        try:
            queryset = Position.objects.count()
            return Response({"position_number": queryset})
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    