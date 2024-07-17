from decimal import Decimal
from ..models import Salary, Payment
from django.utils import timezone



class SalaryCalculator:
    gross_salary = 0
    total_deduction = 0
    net_salary = 0
    income_tax = 0

    def __init__(self, payment: Payment = None):
        if payment is not None:
            self.payment = payment
            self.calc_gross_salary()
            self.calc_total_deduction()
            self.calc_net_salary()
            self.calc_income_tax()
            self.calc_net_salary()

    def calc_income_tax(self):
        if self.gross_salary > 0 and self.gross_salary <= 600:
            self.income_tax = 0
        elif self.gross_salary > 600 and self.gross_salary <= 1650:
            self.income_tax = self.gross_salary * 0.10 - 60
        elif self.gross_salary > 1650 and self.gross_salary <= 3200:
            self.income_tax = self.gross_salary * 0.15 - 142.50
        elif self.gross_salary > 3200 and self.gross_salary <= 5250:
            self.income_tax = self.gross_salary * 0.20 - 302.50
        elif self.gross_salary > 5250 and self.gross_salary <= 7800:
            self.income_tax = self.gross_salary * 0.25 - 565
        elif self.gross_salary > 7800 and self.gross_salary <= 10900:
            self.income_tax = self.gross_salary * 0.30 - 955
        elif self.gross_salary > 10900:
            self.income_tax = self.gross_salary * 0.35 - 1500


    def calc_gross_salary(self):
        allowances_sum = sum(
            [allowance.allowance.allowance_rate for allowance in self.payment.allowances.all()])
        overtime_list = []
        for overtime in self.payment.overtimes.all():
            length_in_hour = overtime.end_time.hour - overtime.start_time.hour
            length_in_minute = overtime.end_time.minute - overtime.start_time.minute
            time_length = length_in_hour + length_in_minute / 60
            value = self.payment.salary / (8 * 20) * Decimal(time_length)
            overtime_list.append(value)
        total = float(sum(overtime_list)) + \
            float(allowances_sum) + float(self.payment.salary)
        self.gross_salary = round(total, 2)
        return float(self.gross_salary)


    def calc_total_deduction(self):
        self.total_deduction = 0
        for deduction in self.payment.deductions.all():
            self.total_deduction += deduction.deduction.deduction_rate * self.payment.salary / 100
        self.calc_income_tax()
        if self.income_tax:
            self.total_deduction = float(
                self.total_deduction) + self.income_tax
        self.total_deduction = round(self.total_deduction, 2)
    
    def calc_income_tax_current_month(self):
        current_month_payments = Payment.objects.filter(
            month__year=timezone.now().year,
            month__month=timezone.now().month
        )

        total_income_tax = sum(
            SalaryCalculator(salary=payment.salary).income_tax
            for payment in current_month_payments
        )

        return total_income_tax


    def calc_net_salary(self):
        self.net_salary = round(
            self.gross_salary - float(self.total_deduction), 2)
