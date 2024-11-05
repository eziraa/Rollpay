

from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from employee.views.payment import PaymentView
from employee.views.statistics import StatisticsView

urlpatterns = [
    path('pay', PaymentView.as_view(), name='__pay_salary__'),
    path('salary', PaymentView.as_view(), name='__pay_salary__'),
    path('pay/<month>', PaymentView.as_view(), name='__pay_salary__'),
    path('pay/<employee_id>/<month>', PaymentView.as_view(),
         name="__pay_salary__to_employee__"),
]
