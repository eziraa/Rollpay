import jwt
from django.contrib.auth import get_user_model
from django.conf import settings
from datetime import datetime, timedelta


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
