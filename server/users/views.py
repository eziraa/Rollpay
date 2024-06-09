from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
        user = User.objects.create_user(
            username=data['username'], password=data['password'])
        user.save()
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    data = json.loads(request.body)
    user = authenticate(username=data['username'], password=data['password'])
    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'Login successful'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=400)
