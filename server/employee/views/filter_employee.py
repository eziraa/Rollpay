from decimal import Decimal
from django.db.models import OuterRef, Subquery
from django.db.models import OuterRef, Subquery, Max, Q

from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Employee, EmployeePosition
from employee.serializers.employee import EmployeeSerializer
from employee.views.utils.pagination import StandardResultsSetPagination


class FilterEmployeeView(APIView):
    # template_name = 'employee/search_results.html'  # Specify your template name

    def get(self, request, filter_by=None):
        # queryset = super().get_queryset()
        # Extract query parameters
        order_by = self.request.GET.get(
            'order_by', 'email')  # Default to 'email'
        order = '-' if self.request.GET.get('order', 'asc') == 'desc' else ''
        position = self.request.GET.get('position')
        date_from = self.request.GET.get('date_of_hire_range[from]')
        date_to = self.request.GET.get('date_of_hire_range[to]')
        salary_min = self.request.GET.get('salary_range[min]')
        salary_max = self.request.GET.get('salary_range[max]')

        # Apply filters
        # Assuming there's no queryset defined in your view
        queryset = Employee.objects.all()
        if date_from:
            queryset = queryset.filter(
                date_of_hire__gte=date_from)
        if date_to:
            queryset = queryset.filter(
                date_of_hire__lte=date_to)
        queryset = queryset.order_by(f'{order}{order_by}')
        if salary_min:
            queryset = [
                employee for employee in queryset if employee.salaries.all().last().basic_salary >= Decimal(salary_min)]
        if salary_max:
            queryset = [
                employee for employee in queryset if employee.salaries.all().last().basic_salary <= Decimal(salary_max)]
        # Apply search
        if filter_by:
            if filter_by == 'name':
                name = self.request.GET.get('search_value')
                queryset = queryset.filter(first_name__icontains=name)
            elif filter_by == 'email':
                email = self.request.GET.get('search_value')
                queryset = queryset.filter(email__icontains=email)
            elif filter_by == 'gender':
                gender = self.request.GET.get('search_value')
                queryset = queryset.filter(gender__icontains=gender)
            elif filter_by == 'phone_number':
                phone = self.request.GET.get('search_value')
                queryset = queryset.filter(phone_number__icontains=phone)
            elif filter_by == 'id':
                id = self.request.GET.get('search_value')
                queryset = queryset.filter(id__istartswith=id)
            else:
                name = self.request.GET.get('search_value')
                queryset = queryset.filter(first_name__icontains=name)
        if position:
            # Get the latest EmployeePosition for each employee (by start_date or no end_date)
            latest_position = EmployeePosition.objects.filter(
                employee=OuterRef('pk')
            ).order_by('-start_date').values('position__position_name')[:1]

            # Annotate the queryset with the latest position name
            employees_with_latest_position = queryset.annotate(
                latest_position_name=Subquery(latest_position)
            )
            queryset = employees_with_latest_position.filter(
                latest_position_name=position
            )
        paginator = StandardResultsSetPagination()
        paginator.page_size = request.query_params.get("page_size", 10)
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = EmployeeSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = EmployeeSerializer(queryset, many=True)
        return Response(serializer.data)
