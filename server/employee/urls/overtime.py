from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from employee.views import overtime

urlpatterns = [
    path('list', overtime.OvertimeView.as_view(), name="__list_overtimes__"),
    path('add', overtime.OvertimeView.as_view(), name='__add_overtime__'),
    path('edit/<overtime_id>', overtime.OvertimeView.as_view(),
         name='__edit_overtime__'),
    path('delete/<overtime_id>', overtime.OvertimeView.as_view(),
         name='__delete_overtime__'),
    path('get/<overtime_id>', overtime.OvertimeView.as_view(),
         name='__get_overtime__'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
