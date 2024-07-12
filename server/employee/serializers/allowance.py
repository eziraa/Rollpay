from ..models import Allowance,AllowanceItem
from rest_framework import serializers


class AllowanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allowance
        fields = "__all__"


class AllowanceItemSerializer(serializers.ModelSerializer):
    allowance_type = serializers.SerializerMethodField(read_only=True)
    allowance_rate = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = AllowanceItem
        fields = ("id", "allowance_type", "allowance_rate", "date_of_given")

    def get_allowance_rate(self, obj: AllowanceItem):
        return obj.allowance.allowance_rate

    def get_allowance_type(self, obj: AllowanceItem):
        return obj.allowance.allowance_type
