from django.core.management.base import BaseCommand
from datetime import datetime, timedelta
from django.utils import timezone
from employee.models import CustomUser


class Command(BaseCommand):
    help = 'Delete expired, not confirmed users' 
    def handle(self, *args, **kwargs):
        expiration_time = timezone.now() - timedelta(minutes=1)
        CustomUser.objects.filter(
            is_active=False, date_joined__lt=expiration_time).delete()
        self.stdout.write(self.style.SUCCESS(
            'Successfully deleted expired, not confirmed users'))
