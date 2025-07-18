                
import datetime
import decimal
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import month
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from employee.models import Employee, EmployeePosition, Payment, Allowance, AllowanceItem, Overtime, OvertimeItem, Deduction, DeductionItem, Position, Role, Salary
from employee.views.user_views import RoleManager

@method_decorator(csrf_exempt, name='dispatch')
class FillDataView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        employees = Employee.objects.all()
        for employee in employees:
                for year in range(2022, 2026):
                    for curent_month in range(1, 13):
                        if year < 2025 or curent_month <= 7:
                            curr_month_temp = month.Month(year, curent_month)
                            curr_date = datetime.date(year, curent_month, 1)
                            curr_date_time = datetime.datetime(year, curent_month, 1)
                            if Payment.objects.filter(month=curr_month_temp, employee=employee).exists():
                                payment = Payment.objects.filter(month=curr_month_temp, employee=employee).first()
                            else:

                                salary = employee.salaries.filter(
                                    start_date__lte=curr_date,
                                ).last()
                                
                                if not salary:
                                    curr_salary = 20000
                                else:
                                    curr_salary = salary.basic_salary
                                payment = Payment.objects.create(employee=employee, month=curr_month_temp, salary=curr_salary)
                                payment.save()
                            for allowance in Allowance.objects.all():
                                if payment.allowances.filter(allowance=allowance):
                                    continue
                                allowance = AllowanceItem.objects.create(
                                    allowance=allowance,
                                    payment=payment,
                                    date_of_given=curr_date_time,
                                    )
                                allowance.date_of_given = curr_date_time
                                allowance.save()
                            for overtime in Overtime.objects.all():
                                if payment.overtimes.filter(overtime=overtime):
                                    continue
                                start_at = curr_date_time
                                end_at = start_at.replace(hour=start_at.hour + random.choice([1, 2, 3, 4, 5, 6, 7, 8, 9]))
                                overtime = OvertimeItem.objects.create(
                                    overtime=overtime, payment=payment, start_time=start_at, end_time=end_at)
                            for deduction in Deduction.objects.all():
                                if payment.deductions.filter(deduction=deduction):
                                    continue
                                deduction = DeductionItem.objects.create(
                                    deduction=deduction, 
                                    payment=payment,
                                    date_of_given=curr_date_time
                                    )
                                deduction.date_of_given = curr_date_time
                                deduction.save()
                        else:
                            break
        return JsonResponse({"message": "Data filled successfully."}, status=200)
@method_decorator(csrf_exempt, name='dispatch')
class PositionAssignmentView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        employees = Employee.objects.all()
        for employee in employees:
            positions = Position.objects.all()
            if not employee.positions.exists():
                position = random.choice(positions)
                if not EmployeePosition.objects.filter(employee=employee, position=position).exists():
                    position = EmployeePosition.objects.create(
                        employee=employee, position=position)
                    position.save()
        return JsonResponse({"message": "Positions assigned successfully."}, status=200)

@method_decorator(csrf_exempt, name='dispatch')
class SalaryFillView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        employees = Employee.objects.all()
        for employee in employees:
            employee_positions = employee.positions.all()
            if not employee_positions.exists():
                position = random.choice(Position.objects.all())
                EmployeePosition.objects.create(employee=employee, position=position)
            for year in range(2022, 2026):
                for month_num in range(1, 13):
                    if year < 2025 or month_num <= 7:
                        curr_month = month.Month(year, month_num)
                        previous_salary = employee.salaries.filter(
                            end_date=None,
                        ).first()
                        start_date = datetime.date(year, month_num, 1)
                        raised_rigions = [True, False, True, False, False, False, False,True]
                        reason = 'for every six month salary raise.'
                        random_raise = random.choice(raised_rigions)
                        if random_raise:
                            reason = 'for project acheivement.'
                        raise_allowed = month_num % 6 == 0 or random_raise
                        if raise_allowed and previous_salary:
                            new_salary = decimal.Decimal(previous_salary.basic_salary) +  previous_salary.basic_salary * decimal.Decimal(0.025)
                            salary = Salary.objects.create(
                                employee=employee,
                                start_date=start_date,
                                end_date=None,
                                basic_salary=new_salary,
                                reason = "Salary raise for the month of {} {}".format(curr_month, reason) 
                            )
                            salary.start_date = start_date
                            salary.save()
                            previous_salary.end_date = start_date - datetime.timedelta(days=1)
                            previous_salary.save()
                        elif not previous_salary:
                            salary = Salary.objects.create(
                                employee=employee,
                                start_date=start_date,
                                end_date=None,
                                basic_salary=random.randint(20000, 50000)
                            )
                            salary.start_date = start_date
                            salary.end_date = None
                            salary.reason = "Initial salary for the month of {} {}".format(curr_month, reason)
                            salary.save()
                
        return JsonResponse({"message": "Salaries filled successfully."}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class RoleCreatorView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        employees = Employee.objects.all()
        roles = ['Clerk', 'sys_admin', 'user']
        for role in roles:
            if not Role.objects.filter(name=role).exists():
                Role.objects.create(name=role)
        for employee in employees:
            if not employee.positions.exists():
                position = Position.objects.create(
                    position_name="Frontend Developer",
                    raise_rate=0.35,
                    basic_salary=25000,
                )
                EmployeePosition.objects.create(employee=employee, position=position)
            employee_positions = employee.positions.all()
            if not employee_positions.exists():
                return JsonResponse({'error': 'Employee positions not found.'}, status=404)
            if not employee.user:
                continue
            RoleManager.add_role(
                employee.user, employee_positions.last().position.position_name)
        return JsonResponse({"message": "Roles created successfully."}, status=200)