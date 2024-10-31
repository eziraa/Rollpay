from django.urls import path

from employee.views import salary_view, filter_employee
from employee.views.user_views import ProfilePicture
from employee.views import salary_view, payment
from employee.views.assets import EmployeeAssetView
from employee.views import employee

# Defining  url patterns to use it as end point
urlpatterns = [
    path('list', employee.EmployeeView.as_view(), name="__list_emplyees__"),
    path('add', employee.EmployeeView.as_view(), name='__add_emoployee__'),
    path('admin', employee.AdminAPIView.as_view(), name='__add_emoployee__'),
    path('admin/delete', employee.AdminAPIView.as_view(),
         name='__delete_emoployee__'),
    path('filter', filter_employee.FilterEmployeeView.as_view(),
         name='__filter_emoployee__'),
    path('filter/<filter_by>', filter_employee.FilterEmployeeView.as_view(),
         name='__filter_emoployee__'),
    path('allowance/add/<employee_id>/<allowance_type>',
         employee.EmployeeView.as_view(), name='__add_allowance_to_employee__'),
    path('edit/<employee_id>', employee.EmployeeView.as_view(),
         name='__edit_emoployee__'),
    path('delete/<employee_id>', employee.EmployeeView.as_view(),
         name='__delete_emoployee__'),
    path("payment",
         payment.PaymentView.as_view(), name='__start_payment__'),
    path("payment/<year>",
         payment.PaymentView.as_view(), name='__start_payment_by_year__'),
    path("payment/<year>/<month>",
         payment.PaymentView.as_view(), name='__start_payment_by_month_year__'),
    path("payment/<employee_id>",
         payment.PaymentView.as_view(), name='__start_payment_to_employee__'),
    path("payment/<employee_id>/<year>",
         payment.PaymentView.as_view(), name='__start_payment_to_employee_by_year__'),
    path("payment/<employee_id>/<year>/<month>",
         payment.PaymentView.as_view(), name='__start_payment_to_employee_by_year_month__'),
    path("salary/get/<employee_id>",
         salary_view.SalaryView.as_view(), name='__get_emp_salary__'),
    path("remove/<employee_id>/<asset_type>/<asset_id>",
         employee.EmployeeView.as_view(), name='__remove_asset_from_emp__'),
    path("allowance/add/<employee_id>/<allowance_type>",
         employee.EmployeeView.as_view(), name='__add_allowance_to_emp__'),
    path("deduction/add/<employee_id>/<deduction_type>",
         employee.EmployeeView.as_view(), name='__add_deduction_to_emp__'),
    path("overtime/add/<employee_id>/<overtime_type>",
         employee.EmployeeView.as_view(), name='__add_overtime_to_emp__'),
    path("salary/get", salary_view.SalaryView.as_view(), name='__get_salary__'),
    path("salary/raise", salary_view.SalaryView.as_view(), name='__raise_salary__'),
    path("salary/raise/<rate>",
         salary_view.SalaryView.as_view(), name='__raise_salary__'),
    path("salary/raise/<employee_id>/<rate>",
         salary_view.SalaryView.as_view(), name='__raise_salary__'),
    path("salary/get/<int:year>/<int:curr_month>",
         salary_view.SalaryView.as_view(), name='__get_salary_by_month__'),
    path('salary/get/<str:employee_id>/<int:year>/<int:curr_month>',
         salary_view.SalaryView.as_view(), name='__get_emoployee_payment_by_month__'),
    path('get/<str:employee_id>', employee.EmployeeView.as_view(),
         name='__get_emoploye__'),
    path('update/<str:id>/', employee.EmployeeView.as_view(),
         name='__update_emoployee__'),
    path("contract/<str:employee_id>",
         EmployeeAssetView.as_view(), name='_employement_contract__'),



] 