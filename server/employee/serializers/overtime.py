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

    def get_overtime_rate(self, obj: OvertimeItem):
        length_in_hour = obj.end_time.hour - obj.start_time.hour
        length_in_minute = obj.end_time.minute - obj.start_time.minute
        if length_in_hour > 0:
            time_length = length_in_hour + length_in_minute / 60
            return str(round(time_length)) + " hour"
        elif length_in_minute > 0:
            return str(length_in_minute) + " minutes"
        else:
            return ""

    def get_date_of_overtime(self, obj: OvertimeItem):
        return obj.start_time.strftime("%Y-%m-%d")

    def get_length_of_overtime(self, obj: OvertimeItem):
        return (obj.end_time.hour - obj.start_time.hour)

