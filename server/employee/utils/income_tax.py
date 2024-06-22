def income_tax(gross_salary: float):
    if gross_salary > 0 and gross_salary <= 600:
        return 0
    elif gross_salary > 600 and gross_salary <= 1650:
        return gross_salary * 0.10 - 60
    elif gross_salary > 1650 and gross_salary <= 3200:
        return gross_salary * 0.15 - 142.50
    elif gross_salary > 3200 and gross_salary <= 5250:
        return gross_salary * 0.20 - 302.50
    elif gross_salary > 5250 and gross_salary <= 7800:
        return gross_salary * 0.25 - 565
    elif gross_salary > 7800 and gross_salary <= 10900:
        return gross_salary * 0.30 - 955
    elif gross_salary > 10900:
        return gross_salary * 0.35 - 1500


def allowance(rate, basic_salary):
    return rate * basic_salary


def total_allowance(allowances, basic_salary):
    # print(AllowanceSerializer(data=allowances, many=True).data)
    return int(basic_salary) * 2 // 100


def gross_salary(basic_salary, allowance):
    return sum([basic_salary, allowance])


def overtime_by_rate(basic_salary, length, rate):
    return basic_salary * rate * length


def overtime_by_time(basic_salary, length):
    return basic_salary/30 * length


def total_deduction(*deductions):
    return sum(deductions)


def net_salary(gross_salary, total_deductons):
    return gross_salary - total_deductons
