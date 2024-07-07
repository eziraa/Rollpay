from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import *
from employee.serializers.statistics import StatisticsSerializer


class StatisticsView(APIView):
    """
    A view that process the statistics of an employees and their salary related stuff.
    """

    def get(self, request, *args, **kwargs):
        serializer = StatisticsSerializer(Payment.objects.all().first())
        return Response(serializer.data, status=200)
