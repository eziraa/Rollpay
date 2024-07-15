from rest_framework.views import APIView
from rest_framework.response import Response
from employee.models import Role
from employee.serializers.roles import RoleSerializer


class RoleView(APIView):
    def get(self, request, *args, **kwargs):
        roles = Role.objects.all()

        return Response(data=RoleSerializer(roles, many=True).data, status=200)
