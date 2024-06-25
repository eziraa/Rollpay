from ..models import Overtime
from rest_framework import serializers


class OvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overtime
        fields = "__all__"
