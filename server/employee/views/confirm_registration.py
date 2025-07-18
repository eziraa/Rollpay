import random
from django.utils.http import urlsafe_base64_decode
from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from django.contrib.auth.tokens import default_token_generator as token_generator
from rest_framework.views import APIView
from django.http import JsonResponse
from employee.views.user_views import RoleManager
from employee.models import CustomUser, Employee, EmployeePosition, Position
from rest_framework.permissions import AllowAny
from datetime import timedelta


class ConfirmRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token, *args, **kwargs):
        try:
            signer = TimestampSigner()
            uid = signer.unsign(uidb64, timedelta(minutes=30))
            user_id = urlsafe_base64_decode(uid).decode()
            user = CustomUser.objects.get(id=user_id)

            if user.is_active:
                return JsonResponse({
                    'error': 'User is already registered.',
                    'exist': True
                }, status=400)

            if token_generator.check_token(user, token):
                user.is_active = True
                user.save()
                employee = Employee.objects.filter(email=user.email).first()
                if not employee:
                    return JsonResponse({'error': 'Employee not found.'}, status=404)
                employee.user = user
                employee.save()
                if not employee.positions.exists():
                    position = Position.objects.create(
                        position_name = "Frontend Developer",
                        raise_rate = 0.35,
                        basic_salary = 25000,
                        )
                    EmployeePosition.objects.create(employee=employee, position=position)
                employee_positions = employee.positions.all()
                if not employee_positions.exists():
                    return JsonResponse({'error': 'Employee positions not found.'}, status=404)
                RoleManager.add_role(user, employee.positions.all().last().position.position_name)

                return JsonResponse({'message': 'Registration confirmed successfully. You can now log in.'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid token or token has expired.'}, status=400)
        except (SignatureExpired):
            return JsonResponse({
                'error': 'Confirmation link expired',
                'resend': True
            }, status=400)
        except (BadSignature):
            return JsonResponse({
                'error': 'Invalid confirmation link.',
                'resend': True
            }, status=400)
        except (TypeError, ValueError):
            raise
        except Employee.DoesNotExist:
            return JsonResponse({'error': 'Employee not found.'}, status=404)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found.'}, status=404)
        except (OverflowError):
            return JsonResponse({
                'error': 'Invalid confirmation link too long.',
                'resend': True
            }, status=400)
