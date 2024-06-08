from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('add/', views.add_employee),
    path('update/<id>/', views.update_employee),
    path('upload-profile-picture/<id>/', views.upload_profile_pic),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
