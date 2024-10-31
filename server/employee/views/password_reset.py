from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.request import Request
from rest_framework import status
from employee.views.token import password_reset_token_generator


class PasswordResetConfirmView(APIView):
    def post(self, request: Request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user: User = request.user
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({'message': 'Invalid token or user not found'}, status=status.HTTP_404_NOT_FOUND)

        new_password = request.data.get('new_password')
        old_password = request.data.get('old_password')
        if not user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.check_password(old_password):
            return Response({'error': 'Incorrect old password'}, status=status.HTTP_400_BAD_REQUEST)
        if password_reset_token_generator.check_token(user, token):
            if not new_password or not old_password:
                return Response({'error': 'New password and old password are required'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password has been reset successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid token check your old password'}, status=status.HTTP_403_FORBIDDEN)
