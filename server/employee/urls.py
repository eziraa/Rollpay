from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

# Defining  url patterns to use it as end point
urlpatterns = [
    path('list', views.EmployeeView.as_view(), name="__list_emplyees__"),
    path('add', views.EmployeeView.as_view(), name='__add_emoployee__'),
    path('edit/<employee_id>', views.EmployeeView.as_view(),
         name='__edit_emoployee__'),
    path('delete/<employee_id>', views.EmployeeView.as_view(),
         name='__delete_emoployee__'),
    path("salary/get", views.SalaryView.as_view(), name='__get_salary__'),
    path('get/<str:id>', views.EmployeeView.as_view(), name='__get_emoploye__'),
    path('update/<str:id>/', views.EmployeeView.as_view(),
         name='__update_emoployee__'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
