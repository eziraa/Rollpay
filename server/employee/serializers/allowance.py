from ..models import Allowance
from rest_framework import serializers


class AllowanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allowance
        fields = "__all__"
