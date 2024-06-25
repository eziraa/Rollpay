from decimal import Decimal
from rest_framework import serializers

from employee.models import Salary
from employee.serializers.allowance import AllowanceSerializer
from employee.serializers.deduction import DeductionSerializer
from employee.serializers.overtime import OvertimeSerializer
from employee.utils.salary_calculator import SalaryCalculator


class SalarySerializer (serializers.ModelSerializer):

    gross_salary = serializers.SerializerMethodField(read_only=True)
    net_salary = serializers.SerializerMethodField(read_only=True)
    allowances = serializers.SerializerMethodField(read_only=True)
    deductions = serializers.SerializerMethodField(read_only=True)
    overtimes = serializers.SerializerMethodField(read_only=True)
    total_deduction = serializers.SerializerMethodField(
        read_only=True)

    income_tax = serializers.SerializerMethodField(read_only=True)

    def __init__(self, instance, *args, **kwargs):
        self.calculator = SalaryCalculator(instance)
        super(SalarySerializer, self).__init__(
            instance=instance, *args, **kwargs)

    class Meta:

        model = Salary
        fields = ('basic_salary', 'gross_salary',
                  "allowances", "deductions", "overtimes",
                  'total_deduction', "income_tax", "net_salary")

    def get_allowances(self, obj: Salary):
        return AllowanceSerializer(obj.allowances, many=True).data

    def get_deductions(self, obj: Salary):
        return DeductionSerializer(obj.deductions, many=True).data

    def get_overtimes(self, obj: Salary):
        return OvertimeSerializer(obj.overtimes, many=True).data

    def get_net_salary(self, obj: Salary):
        return self.calculator.net_salary

    def get_total_deduction(self, obj: Salary) -> float:
        return self.calculator.total_deduction

    def get_gross_salary(self, obj: Salary) -> float:
        return self.calculator.gross_salary

    def get_income_tax(self, obj: Salary) -> Decimal:
        return self.calculator.income_tax
