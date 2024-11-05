from month import Month
import datetime
import random
from django.utils import timezone

from rest_framework.response import Response
from employee.random_date import get_random_dates
from employee.serializers import start_p
from employee.models import Employee, EmployeePosition, Payment, Salary, Overtime, OvertimeItem, Position
import decimal
bulk_raise = [
    {
        "reason": "Increased Productivity",
        "rate": 4,
        "for_all": True,
    },
    {
        "reason": "Reduced Burnout",
        "rate": 4,
        "for_all": True,
    },
    {
        "reason": "Cost of Living Adjustments",
        "rate": 5,
        "for_all": True,
    },

    {
        "reason": "Aligning with Industry Standards",
        "rate": 4,
        "for_all": True,
    }
]


individual_raise = [

    {
        "reason": "Employee Satisfaction and Morale",
        "rate": 4,
        "for_all": False,
    },
    {
        "reason": "Innovation and Long-Term Success",
        "rate": 4,
        "for_all": False,
    },
    {
        "reason": "Talent Retention",
        "rate": 4,
        "for_all": False,
    },
]

start_year = 2022
end_year = 2024
start_month = 1


def change_employee_positions():
    for employee in Employee.objects.all():
        dates = get_random_dates()
        positions = Position.objects.all()
        employee_positions = employee.positions.all().order_by('start_date')
        for i in range(len(dates)):
            date = dates[i]
            if timezone.is_naive(date):
                date = timezone.make_aware(date)
            position = positions[i]
            position.start_date = date
            position.save()


def raise_salaries():
    raise_interval = [Month(2022, 7), Month(
        2023, 1), Month(2023, 7), Month(2024, 1), Month(2024, 7)]
    months = [Month(year=year, month=month) for month in range(1, 13)
              for year in range(start_year, end_year+1)]
    for i in range(0, len(raise_interval)):
        raise_month = raise_interval[i]
        if i == 0:
            month_interval = [
                month for month in months if month.__lt__(raise_month)]
        else:
            previous_raise_month = raise_interval[i - 1]
            month_interval = [
                month for month in months if previous_raise_month.__lt__(month) and month.__lt__(raise_month)]
        if month_interval == []:
            return Response("No months to apply raise", status=404)
        apply_month = random.choice(month_interval)
        print(month_interval)
        is_bulk = random.choice([True, False])
        if is_bulk:
            reason = random.choice(bulk_raise)
            for employee in Employee.objects.all():
                add_salary(employee, apply_month, reason=reason)
        else:
            for employee in Employee.objects.all():
                apply_month = random.choice(month_interval)
                reason = random.choice(individual_raise)
                add_salary(employee, apply_month, reason=reason)
        for employee in Employee.objects.all():
            rate = EmployeePosition.objects.filter(
                employee=employee).last().position.raise_rate
            add_salary(employee, raise_month, reason={
                "reason": "Common interval Raise",
                "rate": rate,
                "for_all": False,
                "employee_id": employee.id
            })


def add_salary(employee, month: Month, reason):
    day = month.first_day()
    print(day)
    basic_salary = 0
    if employee.salaries.count() > 0:
        salary = employee.salaries.last()
        salary.end_date = month.first_day()
        print(")))))))))))")
        print(salary.start_date)
        salary.save()
        print("-------------------------")
        print(salary.start_date)
        print("))))))))))))")
        basic_salary = salary.basic_salary
    else:
        basic_salary = employee.positions.first().position.basic_salary
    new_salary = decimal.Decimal(basic_salary) * \
        decimal.Decimal(1 + reason['rate']/100)
    salary = Salary.objects.create(
        basic_salary=new_salary, reason=reason['reason'], start_date=month.first_day(), employee=employee)


def populate_data():
    for year in range(start_year, end_year+1):
        for month in range(1, 13):
            if year == 2024 and month == 11:
                return True
            month_obj = Month(year=year, month=month)
            for employee in Employee.objects.all():
                payment = Payment.objects.create(
                    employee=employee, month=month_obj, salary=employee.positions.first().get_salary())
                payment.save()
            for reason in salary_increase_reasons:
                salary = Salary.objects.create(
                    basic_salary=employee.positions.first().get_salary() * (1 + reason['rate']/100), reason=reason['reason'], employee=employee)
                salary.save()
            for employee in Employee.objects.all():
                for i in range(1, 6):
                    overtime = Overtime.objects.create(
                        employee=employee, month=month_obj, reason="Overtime Reason "+str(i))
                    overtime.save()
                    for j in range(1, 6):
                        overtime_item = OvertimeItem.objects.create(
                            overtime=overtime, start_time=datetime.datetime(year, month, i, 8, 0), end_time=datetime.datetime(year, month, i, 16, 0))
                        overtime_item.save()
    return True
