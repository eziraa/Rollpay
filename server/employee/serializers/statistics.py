from rest_framework import serializers
from employee.models import *
from django.db import models
from month import Month
from employee.utils.salary_calculator import SalaryCalculator


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
    def get_curr_month_tax(self, obj: Payment):
        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        sum_month_paymnets = 0
        for curr_month_paymnet in curr_month_paymnets:
            calculator = SalaryCalculator(curr_month_paymnet.salary)
            calculator.calc_income_tax()
            sum_month_paymnets += calculator.income_tax
        return format(round(sum_month_paymnets,2),',')   
    def get_curr_month_deduction(self, obj):
        now = datetime.datetime.now()
        curr_month_payments = Payment.objects.filter(
            month__year=now.year, month__month=now.month
        )

        deductions_dict = {}

        for curr_month_payment in curr_month_payments:
            salary = curr_month_payment.salary
            deductions = salary.deductions.values('id', 'deduction_type').annotate(
                total_deduction=models.Sum('deduction_rate')
            )

            for deduction in deductions:
                deduction_type = deduction['deduction_type']
                total_deduction_rate = deduction['total_deduction'] or 0
                total_deduction_amount = (total_deduction_rate / 100) * salary.basic_salary

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

        for curr_month_payment in curr_month_payments:
            salary = curr_month_payment.salary
            allowances = salary.allowances.values('id', 'allowance_type').annotate(
                total_allowance=models.Sum('allowance_rate')
            )

            for allowance in allowances:
                allowance_id = allowance['id']
                allowance_type = allowance['allowance_type']
                total_allowance_rate = allowance['total_allowance'] or 0
                total_allowance_amount = (total_allowance_rate / 100) * salary.basic_salary

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
        allowances = []
        for curr_month_payment in curr_month_paymnets:
            allowance = (curr_month_payment.salary.allowances.aggregate(
                allowance=models.Sum("allowance_rate")))
            if allowance['allowance'] is not None:
                allowances.append(
                    allowance["allowance"] * curr_month_payment.salary.basic_salary)
        return format(round(sum(allowances)/100,2),',')

    def get_curr_month_deductions(self, obj):

        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        deductions = []
        for curr_month_payment in curr_month_paymnets:
            deduction = (curr_month_payment.salary.deductions.aggregate(
                deduction=models.Sum("deduction_rate")))
            if deduction['deduction'] is not None:
                deductions.append(
                    deduction["deduction"] * curr_month_payment.salary.basic_salary)
        return format(round(sum(deductions)/100,2),',')

    def get_curr_month_payment_amount(self, obj):
        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        acc = 0
        for curr_month_payment in curr_month_paymnets:
            calculator = SalaryCalculator(curr_month_payment.salary)
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
