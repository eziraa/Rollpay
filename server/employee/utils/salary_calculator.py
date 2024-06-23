from ..models import Salary


class SalaryCalculator:
    gross_salary = 0
    total_deduction = 0
    net_salary = 0
    income_tax = 0

    def __init__(self, salary: Salary):
        self.salary = salary
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
            [allowance.allowance_rate for allowance in self.salary.allowances.all()])
        self.gross_salary = float(
            self.salary.basic_salary + allowances_sum * self.salary.basic_salary / 100)

    def calc_total_deduction(self):
        self.total_deduction = 0
        for deduction in self.salary.deductions.all():
            self.total_deduction += deduction.deduction_rate * self.salary.basic_salary / 100
        self.calc_income_tax()
        if self.income_tax:
            self.total_deduction = float(
                self.total_deduction) + self.income_tax
        self.total_deduction = round(self.total_deduction, 2)

    def calc_net_salary(self):
        self.net_salary = self.gross_salary - float(self.total_deduction)
