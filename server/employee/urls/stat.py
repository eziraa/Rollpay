
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from employee.views.statistics import StatisticsView

urlpatterns = [
    path('get', StatisticsView.as_view(), name="__get_statistics__"),
    path('payment', StatisticsView.as_view(), name="__payment_statistics__"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
