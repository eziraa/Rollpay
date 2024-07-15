from django.contrib.auth.models import Permission
from rest_framework.views import APIView
from rest_framework.response import Response
from employee.serializers.permissions import PermissionSerializer


class PermissionView(APIView):
    def get(self, request, *args, **kwargs):
        data = PermissionSerializer(Permission.objects.all(), many=True).data
        return Response(data=data, status=200)
