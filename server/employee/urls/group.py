from django.urls import path
from employee.views.group import GroupView
urlpatterns = [
    path("list", GroupView.as_view(), name='__get_groups__'),
]
