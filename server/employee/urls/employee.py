from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from employee.views import views, salary_view, position

# Defining  url patterns to use it as end point
urlpatterns = [
    path('list', views.EmployeeView.as_view(), name="__list_emplyees__"),
    path('add', views.EmployeeView.as_view(), name='__add_emoployee__'),
    path('edit/<employee_id>', views.EmployeeView.as_view(),
         name='__edit_emoployee__'),
    path('delete/<employee_id>', views.EmployeeView.as_view(),
         name='__delete_emoployee__'),
    path("salary/get/<employee_id>",
         salary_view.SalaryView.as_view(), name='__get_emp_salary__'),
    path("salary/get", salary_view.SalaryView.as_view(), name='__get_salary__'),
    path("position/add", position.PosittionView.as_view(), name='__add_position__'),
    path('get/<str:id>', views.EmployeeView.as_view(), name='__get_emoploye__'),
    path('update/<str:id>/', views.EmployeeView.as_view(),
         name='__update_emoployee__'),
    path("position/list", views.PositionView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
