from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import *
from employee.serializers.statistics import StatisticsSerializer
from employee.serializers.payment_statistics import PaymentStatisticsSerilizer
from month import Month

class StatisticsView(APIView):
    """
    A view that process the statistics of employees and their salary related stuff.
    """

    def get(self, request, *args, **kwargs):
        payment = Payment.objects.all().first()
        serializer = StatisticsSerializer(payment)
  
        return Response(data=serializer.data, status=200)

    def post(self, *args, **kwargs):
        now = datetime.datetime.now()
        current_month = Month(year=now.year, month=now.month-1)
        serializer = PaymentStatisticsSerilizer.get_stat(month=current_month)
        print(serializer)
        return Response(data=serializer, status=200)
