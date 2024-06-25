from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from employee.views import allowance

urlpatterns = [
    path('list', allowance.AllowanceView.as_view(), name="__list_allowances__"),
    path('add', allowance.AllowanceView.as_view(), name='__add_allowance__'),
    path('edit/<allowance_id>', allowance.AllowanceView.as_view(),
         name='__edit_allowance__'),
    path('delete/<allowance_id>', allowance.AllowanceView.as_view(),
         name='__delete_allowance__'),
    path('get/<str:id>', allowance.AllowanceView.as_view(),
         name='__get_allowance__'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
