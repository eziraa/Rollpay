
from rest_framework_simplejwt.views import TokenRefreshView
from employee.views.user_views import CustomTokenObtainPairView

from django.contrib import admin
from django.urls import path, include
urlpatterns = [
    path('admin/', admin.site.urls),
    # path("user/login/", TokenObtainPairView.as_view(), name="get_token"),
    path('user/login/', CustomTokenObtainPairView.as_view(), name='get_token'),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('employee/', include('employee.urls.employee')),
    path('user/', include('employee.urls.user')),
]
