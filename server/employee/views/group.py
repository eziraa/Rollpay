from django.contrib.auth.models import Group
from rest_framework.views import APIView
from rest_framework.response import Response
from employee.serializers.group import GroupSerializer


class GroupView(APIView):
    def get(self, request, *args, **kwargs):
        data = GroupSerializer(Group.objects.all(), many=True).data
        return Response(data=data, status=200)
