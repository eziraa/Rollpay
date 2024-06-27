from django.urls import path
from employee.views.user_views import UserView, AccountView, ProfilePicture
urlpatterns = [
    path("register", AccountView.as_view(), name='__user_registration__'),
    path("logout", UserView.as_view(), name='__user_logout__'),
    # path("profile", UserView.as_view(), name='__user_profile__'),
    path("update", UserView.as_view(), name='__user_update__'),
    path("profile/<str:employee_id>", ProfilePicture.as_view(), name='_profile_picture__'),

]
