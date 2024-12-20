from django.urls import path
from employee.views.user_views import UserView, AccountView, ProfilePictureView
from employee.views.confirm_registration import ConfirmRegistrationView
from employee.views.resend_confirm import ResendConfirmView
from employee.views.auth_user import AuthUserView
urlpatterns = [
    path("register", AccountView.as_view(), name='__user_registration__'),
    path("activate", AccountView.as_view(), name='__user_registration__'),
    path("confirm-registration/<uidb64>/<token>", ConfirmRegistrationView.as_view(),
         name='__confirm_registration__'),
    path("resend-confirm/<uidb64>", ResendConfirmView.as_view(),
         name='__resend_confirm__'),
    path('list', UserView.as_view(), name='__get_users__'),
    path('list/<user_id>', UserView.as_view(), name='__get_users__'),
    path("logout", UserView.as_view(), name='__user_logout__'),
    # path("profile", UserView.as_view(), name='__user_profile__'),
    path("update", UserView.as_view(), name='__user_update__'),
    path("current-user",
         AuthUserView.as_view(), name='__user_current__'),
    path("current-user/<user_id>",
         AuthUserView.as_view(), name='__user_current__'),
    path("profile/<str:user_id>",
         ProfilePictureView.as_view(), name='_profile_picture__'),
    path("edit/<user_id>", UserView.as_view(), name='__get_users__'),
    path("delete", UserView.as_view(), name='__delete_users__'),
    path("<user_id>", UserView.as_view(), name='__get_users__'),
    path("add", UserView.as_view(), name='__add_users__'),
    path("edit", UserView.as_view(), name='__edit_user__'),
    path("delete/<user_id>", UserView.as_view(), name='__get_users__'),
]
