from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_employee),
    path('update/<id>', views.update_employee)
]
