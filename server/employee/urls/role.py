from django.urls import path
from employee.views.roles import RoleView
urlpatterns = [
    path('list', RoleView.as_view(), name='__get_roles__')
]
