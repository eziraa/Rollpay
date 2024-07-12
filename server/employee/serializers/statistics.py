from decimal import Decimal
from rest_framework import serializers
from employee.models import *
from django.db import models
from month import Month
from employee.utils.salary_calculator import SalaryCalculator
from employee.serializers.allowance import AllowanceItemSerializer

class StatisticsSerializer(serializers.Serializer):
    total_employees = serializers.SerializerMethodField(read_only=True)
    total_positions = serializers.SerializerMethodField(read_only=True)
    curr_month_tax = serializers.SerializerMethodField(read_only=True)
    curr_month_allowances = serializers.SerializerMethodField(read_only=True)
    curr_month_deductions = serializers.SerializerMethodField(read_only=True)
    curr_month_payment_amount = serializers.SerializerMethodField(
        read_only=True)
    avg_basic_salary = serializers.SerializerMethodField(read_only=True)
    curr_month_allowance = serializers.SerializerMethodField(read_only=True)
    curr_month_deduction = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Payment
        fields = ("total_employees", "total_positions","curr_month_tax",
                  "curr_month_allowances", "curr_month_deductions",  "curr_month_payment_amount", "avg_basic_salary", "curr_month_allowance", "curr_month_deduction")
   
    def get_curr_month_deduction(self, obj):
        now = datetime.datetime.now()
        curr_month_payments = Payment.objects.filter(
            month__year=now.year, month__month=now.month
        )

        deductions_dict = {}

        for curr_month_payment in curr_month_payments:

            for deduction in curr_month_payment.deductions.all():
                deduction_type = deduction.deduction.deduction_type
                total_deduction_rate = deduction.deduction.deduction_rate or 0
                total_deduction_amount = (
                    total_deduction_rate / 100) * curr_month_payment.salary

                if deduction_type in deductions_dict:
                    deductions_dict[deduction_type]['amount'] += total_deduction_amount
                else:
                    deductions_dict[deduction_type] = {
                        'deduction_type': deduction_type,
                        'amount': total_deduction_amount
                    }
            income_tax = self.get_curr_month_tax(curr_month_payment) 
            deductions_dict['income_tax'] = {
                'deduction_type': 'Income Tax',
                'amount': income_tax,
            }

        formatted_deductions_list = list(deductions_dict.values())
        return formatted_deductions_list
    def get_curr_month_allowance(self, obj):
        now = datetime.datetime.now()
        curr_month_payments = Payment.objects.filter(
            month__year=now.year, month__month=now.month
        )

        allowances_dict = {}
        for payment in curr_month_payments:
            for allowance in payment.allowances.all():
                allowance_id = allowance.allowance.id
                allowance_type = allowance.allowance.allowance_type
                total_allowance_rate = allowance.allowance.allowance_rate or 0
                total_allowance_amount = (
                    total_allowance_rate / 100) * payment.salary

                if allowance_id in allowances_dict:
                    allowances_dict[allowance_id]['amount'] += total_allowance_amount
                else:
                    allowances_dict[allowance_id] = {
                        'id': allowance_id,
                        'allowance_type': allowance_type,
                        'amount': total_allowance_amount
                    }

        formatted_allowances_list = list(allowances_dict.values())
        return formatted_allowances_list
    
    def get_total_employees(self, obj):
        return Employee.objects.all().count()

    def get_total_positions(self, obj):
        return Position.objects.all().count()

    def get_curr_month_allowances(self, obj):

        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        allowance_list = []
        for curr_month_payment in curr_month_paymnets:
            allowances = curr_month_payment.allowances.all()
            for allowance in allowances:
                value = allowance.allowance.allowance_rate / 100 * curr_month_payment.salary
            allowance_list.append(value)
        return format(round(sum(allowance_list), 2), ',')
    def get_curr_month_tax(self, obj):
        now = datetime.datetime.now()
        curr_month_payments = Payment.objects.filter(
            month__year=now.year, month__month=now.month
        )
        total_income_tax = 0

        for curr_month_payment in curr_month_payments:
            calculator = SalaryCalculator(curr_month_payment)
            calculator.calc_income_tax()
            total_income_tax += calculator.income_tax

        return total_income_tax

    def get_curr_month_deductions(self, obj):

        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        deductions = []
        for curr_month_payment in curr_month_paymnets:
            for deduction in curr_month_payment.deductions.all():
                deductions.append(
                    deduction.deduction.deduction_rate / 100 * curr_month_payment.salary)
        income_tax = self.get_curr_month_tax(curr_month_payment) 
        total_deduction = sum(deductions)/100
        total_deduction = float(total_deduction) + float(income_tax)
        return format(round(total_deduction,2),',')

    def get_curr_month_payment_amount(self, obj):
        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        acc = 0
        for curr_month_payment in curr_month_paymnets:
            calculator = SalaryCalculator(curr_month_payment)
            calculator.calc_net_salary()
            acc += calculator.net_salary
        return format(round(acc,2),',')
    def get_avg_basic_salary(self, obj):
        basic_salaries = Salary.objects.values('basic_salary')
        sum_basic_salary = 0
        for salary in basic_salaries:
            sum_basic_salary += salary['basic_salary']
        average = sum_basic_salary / len(basic_salaries)

        return format(round(average,2),',')
