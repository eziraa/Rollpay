from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail

from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from django.contrib.auth.tokens import default_token_generator as token_generator
from rest_framework.views import APIView
from django.http import JsonResponse
from employee.models import CustomUser
from rest_framework.permissions import AllowAny
import os


class ResendConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, *args, **kwargs):
        FRONT_END_URL = os.getenv('FRONT_END_URL')
        if FRONT_END_URL is None:
            return JsonResponse({'error': 'Front-end URL is not set'}, status=500)
        try:
            signer = TimestampSigner()
            uid = signer.unsign(uidb64, max_age=None)
            user_id = urlsafe_base64_decode(uid).decode()
            user = CustomUser.objects.get(id=user_id)
            token = token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            uid = signer.sign(uid)
            confirm_link = f'{FRONT_END_URL}/confirm-registration/{
                uid}/{token}'
            # HTML content with a styled button
            html_message = f'''
                <html>
                <head>
                    <style>
                        .container {{
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                        }}
                        .header {{
                            background-color: #f7f7f7;
                            padding: 20px;
                            text-align: center;
                            border-bottom: 1px solid #ddd;
                        }}
                        .content {{
                            padding: 20px;
                        }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>Confirm Your Registration</h2>
                        </div>
                        <div class="content">
                            <p>Dear {user.first_name} {user.last_name},</p>
                            <p>Thank you for registering. Please click the button below to confirm your registration:</p>
                            <a href="{confirm_link}" class="button" style="
                                    display: inline-block;
                                    padding: 10px 20px;
                                    font-size: 16px;
                                    color: #fff;
                                    background-color: #007bff;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    margin-top: 20px;">Confirm Registration</a>
                            <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                            <p>
                            <a href="{confirm_link}"

                                >{confirm_link}</a>
                            </p>
                            <p>Best regards,<br>Your Company</p>
                        </div>
                    </div>
                </body>
                </html>
                '''

            # Send confirmation email
            send_mail(
                'Confirm your registration',
                '',
                'noreply@gmail.com',
                [user.email],
                fail_silently=False,
                html_message=html_message
            )

            return JsonResponse({'message': 'User registered successfully. Please check your email to confirm your registration.'}, status=201)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)
        except (BadSignature):
            return JsonResponse({'error': 'Invalid confirmation link,'}, status=400)
        except (TypeError, ValueError, OverflowError):
            return JsonResponse({'error': 'Invalid confirmation link, please check your email .'}, status=400)
