from django.urls import path
from employee.views.group import GroupView
urlpatterns = [
    path("add", GroupView.as_view(), name='__add_groups__'),
    path("list", GroupView.as_view(), name='__get_groups__'),
    path("list/<group_id>", GroupView.as_view(), name='__get_groups__'),
    path("edit/<group_id>", GroupView.as_view(), name='__get_groups__'),
    path("add_user/<group_id>", GroupView.as_view(), name='__get_groups__'),
    path("delete", GroupView.as_view(), name='__delete_groups__'),
    path("edit", GroupView.as_view(), name='__delete_groups__'),
    path("delete/<group_id>", GroupView.as_view(), name='__get_groups__'),
]
