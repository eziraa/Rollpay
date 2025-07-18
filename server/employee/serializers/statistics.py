from decimal import Decimal
from rest_framework import serializers
from employee.models import *
from django.db import models
from month import Month
from employee.utils.salary_calculator import SalaryCalculator
from employee.serializers.allowance import AllowanceItemSerializer
from .utils import StatisticsCalculator
import datetime
now = datetime.datetime.now()
current_month = Month(year=now.year, month=now.month - 1)
class StatisticsSerializer(serializers.Serializer):
    total_employees = serializers.SerializerMethodField(read_only=True)
    total_positions = serializers.SerializerMethodField(read_only=True)
    curr_month_tax = serializers.SerializerMethodField(read_only=True)
    curr_month_allowances = serializers.SerializerMethodField(read_only=True)
    curr_month_deductions = serializers.SerializerMethodField(read_only=True)
    curr_month_overtimes = serializers.SerializerMethodField(read_only=True)
    curr_month_payment_amount = serializers.SerializerMethodField(
        read_only=True)
    avg_basic_salary = serializers.SerializerMethodField(read_only=True)
    curr_month_allowance = serializers.SerializerMethodField(read_only=True)
    curr_month_deduction = serializers.SerializerMethodField(read_only=True)
    curr_month_overtime = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = Payment
        fields = ("total_employees", "total_positions","curr_month_tax",
                  "curr_month_allowances", "curr_month_deductions",  "curr_month_payment_amount", "avg_basic_salary", "curr_month_allowance", "curr_month_deduction", "curr_month_overtime", "curr_month_overtimes")
   
    def get_curr_month_deduction(self, obj):
        print("get_curr_month_deduction")
        return StatisticsCalculator.deductions_of_a_month(month=current_month)

 
    def get_curr_month_allowance(self, obj):
        print("get_curr_month_allowance")
        return StatisticsCalculator.allowanes_of_a_month(month=current_month)
        

    def get_curr_month_overtime(self, obj):
        '''
        Function to get current month statistics of overtime
        '''
        print('get_curr_month_overtime')
        return StatisticsCalculator.overtimes_of_a_month(month=current_month)
        
    def get_total_employees(self, obj):
        return StatisticsCalculator.total_employees()

    def get_total_positions(self, obj):
        return StatisticsCalculator.get_total_positions()

    def get_curr_month_allowances(self, obj):

        return StatisticsCalculator.total_expense_of_allowances_in_a_month(month=current_month)

    def get_curr_month_overtimes(self, obj):
        '''
        This function to get the total amount of monthly overtime payments
        '''
        return StatisticsCalculator.total_expense_of_overtimes_in_a_month(month=current_month)
    def get_curr_month_tax(self, obj):
        return StatisticsCalculator.total_tax_expense_in_a_month(month=current_month)

    def get_curr_month_deductions(self, obj):

       return StatisticsCalculator.total_expense_of_deductions_in_a_month(month=current_month)

    def get_curr_month_payment_amount(self, obj):
        return StatisticsCalculator.net_payment_of_month(month=current_month)
    def get_avg_basic_salary(self, obj):
        return StatisticsCalculator.avg_basic_salary(month=current_month)
