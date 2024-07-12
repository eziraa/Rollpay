from ..models import Overtime, OvertimeItem, AllowanceItem, DeductionItem
from rest_framework import serializers


class OvertimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overtime
        fields = "__all__"


class OvertimeItemSerializer(serializers.ModelSerializer):
    overtime_type = serializers.SerializerMethodField(read_only=True)
    overtime_rate = serializers.SerializerMethodField(read_only=True)
    length_of_overtime = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = OvertimeItem
        fields = ("id", "overtime_type", "overtime_rate",
                  "start_time", "end_time", "length_of_overtime")

    def get_overtime_type(self, obj):
        return obj.overtime.overtime_type

    def get_overtime_rate(self, obj):
        return obj.overtime.overtime_rate

    def get_date_of_overtime(self, obj: OvertimeItem):
        return obj.start_time.strftime("%Y-%m-%d")

    def get_length_of_overtime(self, obj: OvertimeItem):
        return (obj.end_time.hour - obj.start_time.hour)

