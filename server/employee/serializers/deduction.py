from ..models import Deduction, DeductionItem
from rest_framework import serializers


class DeductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deduction
        fields = "__all__"


class DeductionItemSerializer(serializers.ModelSerializer):
    deduction_type = serializers.SerializerMethodField(read_only=True)
    deduction_rate = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = DeductionItem
        fields = ("id", "deduction_type", "deduction_rate", "date_of_given")

    def get_deduction_rate(self, obj: DeductionItem):
        return obj.deduction.deduction_rate

    def get_deduction_type(self, obj: DeductionItem):
        return obj.deduction.deduction_type
