
from decimal import Decimal
from rest_framework import serializers
from employee.serializers.allowance import AllowanceSerializer
from employee.serializers.salary import SalarySerializer
from employee.serializers.deduction import DeductionSerializer
from employee.serializers.overtime import OvertimeSerializer
from employee.utils.salary_calculator import SalaryCalculator
from ..models import Payment
from .serializers import *


class PaymentSerializer(serializers.ModelSerializer):
    employee_id = serializers.SerializerMethodField(read_only=True)
    employee_name = serializers.SerializerMethodField(read_only=True)
    basic_salary = serializers.SerializerMethodField(read_only=True)
    payment_status = serializers.SerializerMethodField(read_only=True)
    net_salary = serializers.SerializerMethodField(read_only=True)
    allowances = serializers.SerializerMethodField(read_only=True)
    deductions = serializers.SerializerMethodField(read_only=True)
    overtimes = serializers.SerializerMethodField(read_only=True)
    total_deduction = serializers.SerializerMethodField(
        read_only=True)
    income_tax = serializers.SerializerMethodField(read_only=True)
    gross_salary = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Payment
        fields = ('employee_id', 'employee_name', 'payment_status', 'payment_date',
                  'month', 'basic_salary', 'gross_salary',
                  "allowances", "deductions", "overtimes",
                  'total_deduction', "income_tax", "net_salary")

    def get_employee_id(self, obj):
        return obj.employee.id

    def get_employee_name(self, obj):
        return obj.employee.first_name + " " + obj.employee.last_name

    def get_basic_salary(self, obj: Payment):
        return obj.salary.basic_salary

    def get_salary(self, obj):
        return SalarySerializer(obj.salary).data

    def get_payment_status(self, obj: Payment):
        if obj.payment_date:
            return True
        else:
            return False

    def get_allowances(self, obj: Payment):
        return AllowanceSerializer(obj.salary.allowances, many=True).data

    def get_deductions(self, obj: Payment):
        return DeductionSerializer(obj.salary.deductions, many=True).data

    def get_overtimes(self, obj: Payment):
        return OvertimeSerializer(obj.salary.overtimes, many=True).data

    def get_net_salary(self, obj: Payment):
        calculator = SalaryCalculator(obj.salary)
        calculator.calc_net_salary()
        return calculator.net_salary

    def get_total_deduction(self, obj: Payment) -> float:
        calculator = SalaryCalculator(obj.salary)
        calculator.calc_total_deduction()
        return calculator.total_deduction

    def get_gross_salary(self, obj: Payment) -> float:
        calculator = SalaryCalculator(obj.salary)
        calculator.calc_gross_salary()
        return calculator.gross_salary

    def get_income_tax(self, obj: Payment) -> Decimal:
        calculator = SalaryCalculator(obj.salary)
        calculator.calc_income_tax()
        return calculator.income_tax


class MonthlyPaymentSerializer(PaymentSerializer):
    class Meta:
        model = Payment
        fields = ('payment_status', 'payment_date',
                  'month', 'basic_salary', 'gross_salary',
                  "allowances", "deductions", "overtimes",
                  'total_deduction', "income_tax", "net_salary")
