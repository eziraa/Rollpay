from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.views import APIView
from ..models import Deduction
from employee.serializers.deduction import DeductionSerializer
from django.http import JsonResponse
import json
from employee.views.utils.pagination import StandardResultsSetPagination


class DeductionView (APIView):

    def get(self, request: Request, format=None):
        try:
            queryset = Deduction.objects.all().order_by("pk")
            paginator = StandardResultsSetPagination()
            paginator.page_size = request.query_params.get("page_size", 10)
            page = paginator.paginate_queryset(queryset, request)
            if page is not None:
                serializer = DeductionSerializer(page, many=True)
                return paginator.get_paginated_response(serializer.data)
            serializer = DeductionSerializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

    def post(self, request):
        try:
            data = json.loads(request.body)
            if Deduction.objects.filter(email=data['deduction_type']).exists():
                return JsonResponse({'error': 'Deduction already exists'}, status=status.HTTP_400_BAD_REQUEST)
            deduction = Deduction.objects.create(**data)
            serializer = DeductionSerializer(deduction, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return JsonResponse({'error': 'Required field(s) missing in request data'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, deduction_id):
        try:
            deduction = Deduction.objects.get(pk=deduction_id)
        except Deduction.DoesNotExist:
            return Response({"error": "Deduction not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            serializer = DeductionSerializer(deduction)
            deduction.delete()
            return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, deduction_id):
        try:
            deduction = Deduction.objects.get(pk=deduction_id)
        except Deduction.DoesNotExist:
            return Response({"error": "Deduction not found"}, status=status.HTTP_404_NOT_FOUND)
        data = json.loads(request.body)
        serializer = DeductionSerializer(deduction, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
