from decimal import Decimal
from rest_framework import serializers
from employee.models import *
from django.db import models
from month import Month
from employee.utils.salary_calculator import SalaryCalculator
from employee.serializers.allowance import AllowanceItemSerializer


class StatisticsCalculator:
    '''
    This class is used to calculate statistics monthly payments
    '''
    @staticmethod
    def deductions_of_a_month(month: Month):
        '''
        @param month : Month
        @type function to calculate the monthly payments for deduction of a month
        @return list of deductions dictionary with respective payments for each deduction
        '''
        curr_month_payments = Payment.objects.filter(month=month)
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
            income_tax = StatisticsCalculator.total_tax_expense_in_a_month(
                month=month)
            deductions_dict['income_tax'] = {
                'deduction_type': 'Income Tax',
                'amount': income_tax,
            }

        formatted_deductions_list = list(deductions_dict.values())
        return formatted_deductions_list
    staticmethod

    def allowanes_of_a_month(month: Month):
        '''
        @param month: type of Month 
        @type function: to calcuate and get list of allowances for a month payment
        @return list of deductions with amount of money that is paid for this month
        '''

        curr_month_payments = Payment.objects.filter(month=month)
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

    @staticmethod
    def overtimes_of_a_month(month: Month):
        '''
        @param month : type of Month
        @type function : to calculate overtimes of a month
        @return formatted list of overtimes with respective payment of each in a month
        '''
        curr_month_payments = Payment.objects.filter(month=month)
        overtimes_dict = {}
        for curr_month_payment in curr_month_payments:
            overtimes = OvertimeItem.objects.filter(payment=curr_month_payment)
            for overtime in overtimes:
                overtime_type = overtime.overtime.overtime_type
                length_in_hour = overtime.end_time.hour - overtime.start_time.hour
                length_in_minute = overtime.end_time.minute - overtime.start_time.minute
                time_length_hr = length_in_hour + length_in_minute / 60
                total_overtime_amount = (
                    overtime.overtime.overtime_rate / 100) * curr_month_payment.salary * Decimal(time_length_hr)

                if overtime_type in overtimes_dict.keys():
                    overtimes_dict[overtime_type]['amount'] += total_overtime_amount
                else:
                    overtimes_dict[overtime_type] = {
                        'overtime_type': overtime_type,
                        'amount': total_overtime_amount
                    }
        formatted_overtimes_list = list(overtimes_dict.values())
        return formatted_overtimes_list

    @staticmethod
    def total_employees():
        '''
        @param None
        @return total number of employees
        '''
        return Employee.objects.all().count()

    @staticmethod
    def get_total_positions():
        '''
        @param None
        @return total number of positions in the campany
        '''
        return Position.objects.all().count()

    @staticmethod
    def get_total_active_positions():
        '''
        @param None
        @return total number of active positions

        '''
        return Position.objects.filter(end_date=None).count()

    @staticmethod
    def get_total_closed_positions():
        '''
        @param None
        @return total number of closed positions
        '''
        return Position.objects.exclude(end_date=None).count()

    @staticmethod
    def total_expense_of_allowances_in_a_month(month: Month):
        '''
        @param month : Month 
        @type function to calculate total expense for a given month in means of allowances
        @return a number representing total expense for a given month in means of allowance
        '''

        curr_month_paymnets = Payment.objects.filter(month=month)
        allowance_list = []
        for curr_month_payment in curr_month_paymnets:
            allowances = curr_month_payment.allowances.all()
            for allowance in allowances:
                value = allowance.allowance.allowance_rate / 100 * curr_month_payment.salary
                allowance_list.append(value)

        return format(round(sum(allowance_list), 2), ',')

    @staticmethod
    def total_expense_of_overtimes_in_a_month(month: Month):
        '''
        @param month : Month 
        @type function to calculate total expense for a given month in means of overtimes
        @return a number representing total expense for a given month in means of overtimes
        '''
        now = datetime.datetime.now()
        curr_month_paymnets = Payment.objects.filter(
            month=Month(now.year, now.month))
        overtime_list = []
        for curr_month_payment in curr_month_paymnets:
            overtimes = curr_month_payment.overtimes.all()
            for overtime in overtimes:
                length_in_hour = overtime.end_time.hour - overtime.start_time.hour
                length_in_minute = overtime.end_time.minute - overtime.start_time.minute
                time_length = length_in_hour + length_in_minute / 60
                value = overtime.overtime.overtime_rate / 100 * \
                    curr_month_payment.salary * Decimal(time_length)
                overtime_list.append(value)
        return format(round(sum(overtime_list), 2), ',')

    @staticmethod
    def total_tax_expense_in_a_month(month: Month):
        '''
        @param month : Month
        @type Month
        @return  a number representing the total amount of tax in a month
        '''
        curr_month_payments = Payment.objects.filter(month=month)
        total_income_tax = 0
        for curr_month_payment in curr_month_payments:
            calculator = SalaryCalculator(curr_month_payment)
            calculator.calc_income_tax()
            total_income_tax += calculator.income_tax
        return total_income_tax

    @staticmethod
    def total_expense_of_deductions_in_a_month(month: Month):
        '''
        @param month : Month 
        @type function to calculate total expense for a given month in means of deductions
        @return a number representing total expense for a given month in means of deductions
        '''
        curr_month_paymnets = Payment.objects.filter(month=month)
        deductions = []
        for curr_month_payment in curr_month_paymnets:
            for deduction in curr_month_payment.deductions.all():
                deductions.append(
                    deduction.deduction.deduction_rate / 100 * curr_month_payment.salary)
        income_tax = StatisticsCalculator.total_tax_expense_in_a_month(
            month=month)
        total_deduction = sum(deductions)/100
        total_deduction = float(total_deduction) + float(income_tax)
        return format(round(total_deduction, 2), ',')

    @staticmethod
    def net_payment_of_month(month: Month):
        '''
        @param month
        @type Month
        @return a number representing the amount of total net payment for the month
        '''
        curr_month_paymnets = Payment.objects.filter(month=month)
        acc = 0
        for curr_month_payment in curr_month_paymnets:
            calculator = SalaryCalculator(curr_month_payment)
            calculator.calc_net_salary()
            acc += calculator.net_salary
        return format(round(acc, 2), ',')

    @staticmethod
    def avg_basic_salary(month: Month):
        '''
        @param month
        @type Month
        @return a number representing the average basic salary employees in this month
        '''
        payments = Payment.objects.filter(month=month)
        sum_basic_salary = 0
        for salary in payments:
            sum_basic_salary += salary.salary
        average = sum_basic_salary / len(payments)

        return format(round(average, 2), ',')
