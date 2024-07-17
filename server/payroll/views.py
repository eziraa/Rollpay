import datetime
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def get_server_time(request):
    server_time = datetime.datetime.now()
    return JsonResponse({'server_time': server_time.isoformat()})
