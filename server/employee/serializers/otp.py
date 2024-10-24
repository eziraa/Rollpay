from rest_framework import serializers
from django.contrib.auth.models import User


class OTPSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetSerializer(serializers.Serializer):
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(max_length=128)
