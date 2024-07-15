from decimal import Decimal
from rest_framework import serializers
from employee.models import *
from django.db import models
from month import Month
from employee.utils.salary_calculator import SalaryCalculator
from employee.serializers.allowance import AllowanceItemSerializer
from .utils import StatisticsCalculator


class PaymentStatisticsSerilizer:
    @staticmethod
    def get_stat(month: Month):
        data = {
            'total_amount_of_payment': StatisticsCalculator.net_payment_of_month(month),
            'total_deductions_payment': StatisticsCalculator.total_expense_of_deductions_in_a_month(month),
            'total_allowances_payment': StatisticsCalculator.total_expense_of_allowances_in_a_month(month),
            'total_overtimes_payment': StatisticsCalculator.total_expense_of_overtimes_in_a_month(month),
            'payment_date': Payment.objects.filter(month=month).first().payment_date,
            'month': month.datestring()}
        return data
