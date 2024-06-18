import jwt
from django.contrib.auth import get_user_model
from django.conf import settings
from datetime import datetime, timedelta
from .models import Allowance
def refresh_jwt_token(old_token):
    try:
        # Decode the old token
        payload = jwt.decode(
            old_token, settings.SECRET_KEY, algorithms=['HS256'])

        # Check if the token has expired and is within the refresh grace period
        exp = datetime.fromtimestamp(payload['exp'])
        now = datetime.now()
        if now > exp and (now - exp).days > 7:  # Assuming a 7-day grace period
            return None  # Token is too old to be refreshed

        # Verify the user exists and is active
        User = get_user_model()
        user = User.objects.filter(
            id=payload['user_id'], is_active=True).first()
        if not user:
            return None

        # Generate a new token
        new_payload = {
            'user_id': user.id,
            'exp': datetime.now() + timedelta(days=1),  # Token expires in 1 day
            'iat': datetime.now()
        }
        new_token = jwt.encode(
            new_payload, settings.SECRET_KEY, algorithm='HS256')

        return new_token
    except jwt.ExpiredSignatureError:
        # Handle expired token
        return None
    except jwt.InvalidTokenError:
        # Handle any other token errors
        return None

def income_tax(gross_salary):
    if gross_salary < 0:
        return 'Gross salary can not be negative'
    elif gross_salary > 0 and gross_salary <= 600:
        return 0
    elif gross_salary > 600  and gross_salary <= 1650:
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
    return  basic_salary * rate * length 

def overtime_by_time(basic_salary, length):
    return basic_salary/30 * length

def total_deduction(*deductions):
    return sum(deductions)

def net_salary(gross_salary, total_deductons):
    return gross_salary - total_deductons