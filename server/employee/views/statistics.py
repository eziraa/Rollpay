from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import *
import datetime
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
        Payment.objects.filter(month__gt=Month(
            year=now.year, month=now.month)).delete()
        lastPayment = Payment.objects.filter().order_by('month').last()
        last_12_months = [Month(year=lastPayment.month.year-1, month=i)
                          for i in range(lastPayment.month.month+1, 13)]
        for i in range(1, lastPayment.month.month+1):
            last_12_months.append(
                Month(year=lastPayment.month.year, month=i))
        serializer = [PaymentStatisticsSerilizer.get_stat(
            month=curr_month) for curr_month in last_12_months]
        serializer.reverse()
        return Response(data=serializer, status=200)
