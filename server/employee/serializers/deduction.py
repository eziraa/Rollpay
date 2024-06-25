from ..models import Deduction
from rest_framework import serializers


class DeductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deduction
        fields = "__all__"
