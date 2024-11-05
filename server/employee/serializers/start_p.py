from employee.models import Employee, Payment, Allowance, AllowanceItem, Overtime, OvertimeItem, Deduction, DeductionItem
from datetime import datetime
from django.utils import timezone
import month as month_module
from month import Month
import random
month = month_module.Month(datetime.today().year, datetime.today().month)


def add_assets(payment: Payment):

    def add_overtimes(payment: Payment):
        overtimes = Overtime.objects.all()
        for overtime in overtimes:
            # Generate a random day within the payment month
            random_day = random.choice([i for i in range(
                payment.month.first_day().day, payment.month.last_day().day + 1)])

            # Create a naive datetime object for the random day
            start_time = datetime(payment.month.year,
                                  payment.month.month, random_day, hour=random.choice([2, 3, 4, 5, 6]))
            end_time = datetime(payment.month.year,
                                payment.month.month, random_day,  hour=start_time.hour + random.choice([2, 3, 4, 5, 6]))
            OvertimeItem.objects.create(
                payment=payment, start_time=timezone.make_aware(start_time), end_time=timezone.make_aware(end_time),  overtime=overtime)

    def add_allowances(payment: Payment):
        allowances = Allowance.objects.all()
        for allowance in allowances:
            AllowanceItem.objects.create(
                payment=payment, date_of_given=payment.month.first_day(), allowance=allowance)

    def add_deductions(payment: Payment):
        deductions = Deduction.objects.all()
        for deduction in deductions:
            DeductionItem.objects.create(
                payment=payment, date_of_given=payment.month.first_day(), deduction=deduction)
    add_allowances(payment=payment)
    add_overtimes(payment=payment)
    add_deductions(payment=payment)


def get_salary(obj: Employee, date=datetime.now()):
    if obj.salaries.all():
        for salary in obj.salaries.all():
            if (salary.start_date <= date and (salary.end_date is None or salary.end_date > date)):
                return salary.basic_salary
        return obj.salaries.all().last().basic_salary
    else:
        return 0


def generate_payment_id(employee: Employee):
    payment_id = datetime.now().strftime("%Y%m%d%H%M%S") + str(employee.id[2:])
    return payment_id


def start_payment_for_employee(employee: Employee, month: Month):

    payment_id = generate_payment_id(employee=employee)
    if Payment.objects.filter(month=month, employee=employee).exists():
        return 0
    Payment.objects.create(
        employee=employee, month=month, salary=get_salary(employee, date=month.last_day()))

    return payment_id


def start_payment(month: Month = month):
    employees = Employee.objects.all()
    for employee in employees:
        if not employee.user:
            continue
        if Payment.objects.filter(month=month, employee=employee).exists():
            Payment.objects.filter(month=month, employee=employee).delete()
        payment_id = start_payment_for_employee(employee, month)
