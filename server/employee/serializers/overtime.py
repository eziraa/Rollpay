from ..models import Overtime, OvertimeItem
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
        time_difference = obj.end_time - obj.start_time

        total_seconds = time_difference.total_seconds()

        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60

        if hours > 0:
            return f"{int(hours)} hour{'s' if hours != 1 else ''}"
        elif minutes > 0:
            return f"{int(minutes)} minute{'s' if minutes != 1 else ''}"
        else:
            return ""

    def get_length_of_overtime(self, obj: OvertimeItem):
        return (obj.end_time.hour - obj.start_time.hour)

