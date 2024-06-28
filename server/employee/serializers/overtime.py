from ..models import Overtime, OvertimeItem
from rest_framework import serializers


class OvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overtime
        fields = "__all__"


class OvertimeItemSerializer(serializers.ModelSerializer):
    overtime_type = serializers.SerializerMethodField(read_only=True)
    overtime_rate = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OvertimeItem
        fields =( "overtime_type", "overtime_rate", "date_of_overtime", "length_of_overtime")

    def get_overtime_type(self, obj):
        return obj.overtime.overtime_type

    def get_overtime_rate(self, obj):
        return obj.overtime.overtime_rate
