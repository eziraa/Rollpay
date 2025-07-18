from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from employee.views.token import password_reset_token_generator
from rest_framework.views import APIView
import os


class PasswordResetEmailView(APIView):
    def post(self, request: Request):
        email = request.data.get('email')
        if email:
            try:
                user = request.user
                token = password_reset_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                FRONT_END_URL = os.getenv('FRONT_END_URL')

                if FRONT_END_URL is None:
                    return Response({'error': 'Front-end URL is not set'}, status=status.HTTP_400_BAD_REQUEST)
                reset_link = f'''{FRONT_END_URL}/password-reset-confirm/{
                    uid}/{token}'''

                # HTML content with a styled button
                html_message = f'''
                <html>
                <body>
                    <p>Click the button below to reset your password:</p>
                    <a href="{reset_link}" style="
                        display: inline-block;
                        padding: 5px 10px;
                        font-size: 16px;
                        color: #fff;
                        background-color: #007bff;
                        text-decoration: none;
                        border-radius: 5px;
                    ">Reset Password</a>
                    <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                    <p><a href="{reset_link}">{reset_link}</a></p>
                </body>
                </html>
                '''

                send_mail(
                    'Password Reset',
                    'ETD Payroll',
                    'ezratgab@gmail.com',
                    [email],
                    fail_silently=False,
                    html_message=html_message
                )
                return Response({'message': 'Password reset link sent'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'error': 'Something went wrong'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
