from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
import json


@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
        if User.objects.filter(username=data['username']).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)
        user = User.objects.create_user(
            username=data['username'], password=data['password'],
        )
        user.save()
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    except KeyError as e:
        return JsonResponse({'error': f'Missing field: {str(e)}'}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    data = json.loads(request.body)
    user = authenticate(username=data['username'], password=data['password'])
    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        user_data = {
            'username': user.username,
            'email': user.email,
        }
        return JsonResponse({
            'message': 'Login successful',
            'user': user_data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def logout_user(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'}, status=200)
