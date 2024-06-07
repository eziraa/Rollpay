from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import EmployeeSerializer
# Create your views here.

@api_view(['POST'])
def add_employee(request):
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"message": "Could not create employee"}, status=status.HTTP_400_BAD_REQUEST)

