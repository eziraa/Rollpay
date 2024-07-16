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
                employee=employee, month__lt=month)
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
        for employee in employees:
            hired_month = employee.date_of_hire.month
            hired_year = employee.date_of_hire.year
            total_month = (now.year - hired_year) * 12
            salary = Salary.objects.filter(
                employee=employee).order_by('pk').last()
            salary.basic_salary = Position.objects.get(
                position_name=employee.position).basic_salary
            salary.save()
            months = []
            for month in range(hired_month+6, total_month, 6):
                month = Month(year=hired_year + month//12, month=month % 12)
                months.append(month)
            for month in months:
                for payment in Payment.objects.order_by('month').filter(employee=employee)[1:]:
                    if payment.month == month:
                        rate = SalaryManager.get_position_rate(
                            employee=employee)
                        SalaryManager.raise_salary(
                            employee=employee, month=month, rate=rate)
                    elif payment.month == Month(year=employee.date_of_hire.year, month=employee.date_of_hire.month):
                        continue
                    else:
                        prev_month_year = payment.month.year if payment.month.month - \
                            1 > 0 else payment.month.year - 1
                        prev_month = payment.month.month - 1 if payment.month.month - 1 > 0 else 12
                        prev_month = Month(
                            year=prev_month_year, month=prev_month)
                        prev_payment = Payment.objects.filter(
                            employee=employee, month=prev_month)
                        if prev_payment.exists():
                            payment.salary = prev_payment.first().salary
                            payment.save()
                        else:
                            prev_payment = Payment.objects.create(
                                employee=employee, month=prev_month, salary=salary.basic_salary)

    @staticmethod
    def get_position_rate(employee: Employee):
        position = Position.objects.get(position_name=employee.position)
        if position:
            return position.raise_rate
        else:
            return Decimal(0)
