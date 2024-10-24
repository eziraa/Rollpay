from django.urls import path
from employee.views.roles import RoleView
urlpatterns = [
    path("add", RoleView.as_view(), name='__add_roles__'),
    path("list", RoleView.as_view(), name='__get_roles__'),
    path("list/<role_id>", RoleView.as_view(), name='__get_roles__'),
    path("edit/<role_id>", RoleView.as_view(), name='__get_roles__'),
    path("add_user/<role_id>", RoleView.as_view(), name='__get_roles__'),
    path("delete", RoleView.as_view(), name='__delete_roles__'),
    path("edit", RoleView.as_view(), name='__delete_roles__'),
    path("delete/<role_id>", RoleView.as_view(), name='__get_roles__'),
]
