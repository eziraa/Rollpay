from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views
from . import salary

# Defining  url patterns to use it as end point
urlpatterns = [
    path('list', views.EmployeeView.as_view(), name="__list_emplyees__"),
    path('add', views.EmployeeView.as_view(), name='__add_emoployee__'),
    path('salary/add/<employee_id>', salary.AddSalaryToEmployeeAPIView.as_view(),
         name='__add_salary__'),
    path('get/<str:id>', views.EmployeeView.as_view(), name='__get_emoploye__'),
    path('update/<str:id>/', views.EmployeeView.as_view(),
         name='__update_emoployee__'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
