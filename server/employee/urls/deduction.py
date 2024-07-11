from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from employee.views import deduction

urlpatterns = [
    path('list', deduction.DeductionView.as_view(), name="__list_deductions__"),
    path('add', deduction.DeductionView.as_view(), name='__add_deduction__'),
    path('edit/<deduction_id>', deduction.DeductionView.as_view(),
         name='__edit_deduction__'),
    path('delete/<deduction_id>', deduction.DeductionView.as_view(),
         name='__delete_deduction__'),
    path('get/<deduction_id>', deduction.DeductionView.as_view(),
         name='__get_deduction__'),
    path('close/<deduction_id>', deduction.DeductionView.as_view(),
         name='__close_deduction__'),
    path('open/<deduction_id>', deduction.DeductionView.as_view(),
         name='__open_deduction__'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
