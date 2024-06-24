from rest_framework.views import APIView
from rest_framework.response import Response
from employee.serializers.serializers import PositionSerializer
from ..models import Position


class PosittionView(APIView):
    def post(self, request, *args, **kwargs):
        if Position.objects.filter(position_name=request.data['position_name']).exists():
            return Response({'error': 'Position already exists'}, status=400)
        position = Position.objects.create(**request.data)
        position.save()
        serializer = PositionSerializer(position)
        return Response(serializer.data, status=201)
