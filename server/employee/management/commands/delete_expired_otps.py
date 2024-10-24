from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from django.utils import timezone
from employee.models import OTP


class Command(BaseCommand):
    help = 'Delete expired OTPs'

    def handle(self, *args, **kwargs):
        expiration_time = timezone.now() - timedelta(minutes=10)
        OTP.objects.filter(created_at__lt=expiration_time).delete()
        self.stdout.write(self.style.SUCCESS(
            'Successfully deleted expired OTPs'))
