from django.urls import path
from .user_views import UserView, AccountView
urlpatterns = [
    path("register", AccountView.as_view(), name='__user_registration__'),
    path("logout", UserView.as_view(), name='__user_logout__'),
    path("profile", UserView.as_view(), name='__user_profile__'),
    path("update", UserView.as_view(), name='__user_update__'),
]
