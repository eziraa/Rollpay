
from rest_framework_simplejwt.views import TokenRefreshView
from employee.views.user_views import CustomTokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from .views import get_server_time
urlpatterns = [
    path('admin/', admin.site.urls),
    # path("user/login/", TokenObtainPairView.as_view(), name="get_token"),
    path('user/login/', CustomTokenObtainPairView.as_view(), name='get_token'),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('employee/', include('employee.urls.employee')),
    path('position/', include('employee.urls.position')),
    path('deduction/', include('employee.urls.deduction')),
    path('allowance/', include('employee.urls.allowance')),
    path('overtime/', include('employee.urls.overtime')),
    path('user/', include('employee.urls.user')),
    path('group/', include('employee.urls.group')),
    path('permission/', include('employee.urls.permission')),
    path('stat/', include('employee.urls.stat')),
    path('role/', include('employee.urls.role')),
    path('asset/', include('employee.urls.asset')),
    path('server-time', get_server_time, name='__get_servr_time__')

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

