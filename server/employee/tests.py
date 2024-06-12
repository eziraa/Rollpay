from django.test import TestCase
from rest_framework.generics import RetrieveDestroyAPIView
from django.db.models


class UserView(RetrieveDestroyAPIView):
    user = User.objects.all()

# Create your tests here.
