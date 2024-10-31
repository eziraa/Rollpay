from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.utils import timezone
from employee.models import OTP
from employee.views.token import password_reset_token_generator
from employee.serializers.otp import OTPSerializer, PasswordResetSerializer
import random
import datetime
import os


class GenerateOTPView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        FRONT_END_URL = os.getenv('FRONT_END_URL')
        if FRONT_END_URL is None:
            return Response({'error': 'Front-end URL is not set'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                otp = str(random.randint(100000, 999999))
                while OTP.objects.filter(otp=otp).count() > 0:
                    otp = str(random.randint(100000, 999999))
                token = password_reset_token_generator.make_token(user)
                OTP.objects.create(user=user, otp=otp, token=token)

                # HTML content with a styled button and copy functionality
                html_message = f'''
                <html>
                <head>
                    <style>

                        .otp {{
                            font-size: 20px;
                            font-weight: bold;
                            color: #007bff;
                            cursor: pointer;
                        }}
                    </style>
                </head>
                <body>
                    <p>Your OTP code is:</p>
                    <p class="otp" id="otp">{otp}</p>
                    <p>Use it as soon as possible. It will automatically expire after 10 minutes.</p>
                    <a href="{FRONT_END_URL}/reset-password" style = "
                            display: inline-block;
                            padding: 10px 20px;
                            font-size: 16px;
                            color: #007bff;
                            border:2px solid #007bff;
                            text-decoration: none;
                            border-radius: 5px;
                            margin-top: 20px;
                            ">Reset Password</a>
                </body>
                </html>
                '''

                send_mail(
                    'Your OTP Code',
                    'ETD payroll.com',
                    'ezratgab@gmail.com',
                    [email],
                    fail_silently=False,
                    html_message=html_message
                )
                return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Bad Request check your data'}, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            otp = serializer.validated_data['otp']
            new_password = serializer.validated_data['new_password']
            try:
                otp_instance = OTP.objects.filter(
                    otp=otp, is_used=False).first()
                user = otp_instance.user
                if otp_instance and password_reset_token_generator.check_token(user, otp_instance.token):
                    # Check if OTP is expired
                    now = timezone.now()
                    otp_creation_time = otp_instance.created_at
                    # Ensure otp_creation_time is timezone-aware
                    if timezone.is_naive(otp_creation_time):
                        otp_creation_time = timezone.make_aware(
                            otp_creation_time)

                    time_difference = now - otp_creation_time
                    if time_difference < datetime.timedelta(minutes=10):
                        user.set_password(new_password)
                        user.save()
                        otp_instance.delete()
                        return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
                    else:
                        return Response({'error': 'OTP Expired'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': "Invalid Data"}, status=status.HTTP_400_BAD_REQUEST)
