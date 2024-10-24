from django.urls import path
from employee.views.otp_view import GenerateOTPView, ResetPasswordView
from employee.views.signed_link import PasswordResetEmailView
from employee.views.password_reset import PasswordResetConfirmView
urlpatterns = [
    path('generate-otp/', GenerateOTPView.as_view(), name='generate-otp'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('password-reset/', PasswordResetEmailView.as_view(), name='password_reset'),
    path('password-reset-confirm/<uidb64>/<token>/',
         PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

]
