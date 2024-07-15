from django.urls import path
from employee.views.permission import PermissionView

urlpatterns = [
    path("list", PermissionView.as_view(), name='__get_permissions__'),
]
