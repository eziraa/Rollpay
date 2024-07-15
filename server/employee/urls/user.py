from django.urls import path
from employee.views.user_views import UserView, AccountView, ProfilePictureView
urlpatterns = [
    path("register", AccountView.as_view(), name='__user_registration__'),
    path("logout", UserView.as_view(), name='__user_logout__'),
    # path("profile", UserView.as_view(), name='__user_profile__'),
    path("update", UserView.as_view(), name='__user_update__'),
    path("current-user/<user_id>",
         UserView.as_view(), name='__user_current__'),
    path("profile/<str:user_id>",
         ProfilePictureView.as_view(), name='_profile_picture__'),
]
