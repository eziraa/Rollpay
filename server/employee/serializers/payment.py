
from decimal import Decimal
from django.db.models import Min, Max
from rest_framework import serializers
from month import Month
from employee.serializers.allowance import AllowanceItemSerializer
from employee.serializers.salary import SalarySerializer
from employee.serializers.deduction import DeductionItemSerializer
from employee.serializers.overtime import OvertimeItemSerializer
from employee.utils.salary_calculator import SalaryCalculator
from ..models import Payment, Salary
from .employee import *
import datetime 
class MonthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Month
        fields =( "year", 'month')

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
    salary_history = serializers.SerializerMethodField(read_only=True)
    payment_date = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Payment
        fields = ('employee_id', 'employee_name',  'basic_salary',
                  "allowances", "overtimes", 'gross_salary', "deductions",
                 "income_tax",  'total_deduction', "net_salary", 'month', 'payment_status', 'payment_date',
                  'salary_history'
                  )

    def get_employee_id(self, obj):
        return obj.employee.id
    def get_payment_date(self, obj):
        if(obj.payment_date):
            return obj.payment_date.strftime('%Y-%m-%d')
        return obj.payment_date
    def get_salary_history(self, obj:Employee):
            employee = obj.employee
            salaries = Salary.objects.filter(employee=employee)
            formatted_salary_history = []
            if salaries.exists():
                for salary in salaries:
                    payment_list = Payment.objects.filter(employee=employee, salary=salary.basic_salary)
                    if payment_list.exists():
                        formatted_salary_history.append (
                            {
                                'salary': salary.basic_salary,
                                'from': str(payment_list.first().month),
                                'to':str (payment_list.last().month),
                            }
                        )
                return formatted_salary_history
            return []

    def get_employee_name(self, obj):
        return obj.employee.first_name + " " + obj.employee.last_name

    def get_basic_salary(self, obj: Payment):
        return round(obj.salary, 2)

    def get_salary(self, obj):
        return SalarySerializer(obj.salary).data

    def get_payment_status(self, obj: Payment):
        if obj.payment_date:
            return True
        else:
            return False

    def get_allowances(self, obj: Payment):
        return AllowanceItemSerializer(obj.allowances.all(), many=True).data

    def get_deductions(self, obj: Payment):
        return DeductionItemSerializer(obj.deductions.all(), many=True).data

    def get_overtimes(self, obj: Payment):
        return OvertimeItemSerializer(obj.overtimes.all(), many=True).data

    def get_net_salary(self, obj: Payment):
        calculator = SalaryCalculator(obj)
        calculator.calc_net_salary()
        return round(calculator.net_salary, 2)

    def get_total_deduction(self, obj: Payment) -> float:
        calculator = SalaryCalculator(obj)
        calculator.calc_total_deduction()
        return round(calculator.total_deduction, 2)

    def get_gross_salary(self, obj: Payment) -> float:
        calculator = SalaryCalculator(obj)
        calculator.calc_gross_salary()
        return round(calculator.gross_salary, 2)

    def get_income_tax(self, obj: Payment) -> Decimal:
        calculator = SalaryCalculator(obj)
        calculator.calc_income_tax()
        return round(calculator.income_tax, 2)


class MonthlyPaymentSerializer(PaymentSerializer):
    class Meta:
        model = Payment
        fields = ('payment_status', 'payment_date',
                  'month', 'basic_salary', 'gross_salary',
                  "allowances", "deductions", "overtimes",
                  'total_deduction', "income_tax", "net_salary", 
                  'salary_history'
                  )
