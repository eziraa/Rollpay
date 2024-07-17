from decimal import Decimal
from month import Month
import datetime
from employee.models import Employee, Salary, Payment, Position


class SalaryManager:

    @staticmethod
    def raise_salary(employee: Employee, rate: Decimal, month: Month | None = None):
        current_salary = employee.salaries.all().last().basic_salary
        salary = Salary.objects.create(
            employee=employee, basic_salary=current_salary * rate / 100 + current_salary)
        if month:
            payment = Payment.objects.filter(
                employee=employee, month=month)
            if payment.exists():
                payment = payment.first()
                payment.salary = salary.basic_salary
                payment.save()
            else:
                payment = Payment.objects.create(
                    employee=employee, month=month, salary=salary.basic_salary)

    @staticmethod
    def common_raise():
        employees = Employee.objects.all()
        now = datetime.datetime.now()
        curr_month = Month(year=now.year, month=now.month)
        Salary.objects.all().delete()
        for employee in employees:
            hired_month = employee.date_of_hire.month
            hired_year = employee.date_of_hire.year
            total_month = (now.year - hired_year) * \
                12 + now.month
            salary = Salary.objects.create(
                employee=employee, basic_salary=SalaryManager.get_basic_salary(employee=employee))
            months = []
            for month in range(hired_month+6, total_month+1, 6):
                month = Month(year=hired_year + month//12,
                              month=month % 12 if month % 12 != 0 else 12)
                months.append(month)
            for month in months:
                if curr_month == month:
                    curr_payment = Payment.objects.filter(
                        employee=employee, month=month)
                    if curr_payment.exists():
                        payment = curr_payment.first()
                        rate = SalaryManager.get_position_rate(
                            employee=employee)
                        SalaryManager.raise_salary(
                            employee=employee, rate=rate)

    @staticmethod
    def get_position_rate(employee: Employee):
        position = Position.objects.get(
            position_name=employee.position.all().last().position_name)
        if position:
            return position.raise_rate
        else:
            return Decimal(0)

    @staticmethod
    def get_basic_salary(employee: Employee):
        basic_salary = position = Position.objects.get(
            position_name=employee.position.all().last().position_name).basic_salary
        return basic_salary
