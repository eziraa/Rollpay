from django.urls import path
from employee.views.group import GroupView
urlpatterns = [
    path("add", GroupView.as_view(), name='__add_groups__'),
    path("list", GroupView.as_view(), name='__get_groups__'),
]
