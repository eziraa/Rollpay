from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Employee)
admin.site.register(Salary)
admin.site.register(Allowance)
admin.site.register(Deduction)
admin.site.register(Overtime)
