from django.views.generic import ListView
from rest_framework.views import APIView
from rest_framework.response import Response
# Assuming your model is named Employee and located in models.py
from ..models import Employee
from employee.serializers.employee import EmployeeSerializer
from .views import StandardResultsSetPagination


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


        if position:
            queryset = queryset.filter(position=position)
        if date_from and date_to:
            queryset = queryset.filter(
                date_of_hire__range=[date_from, date_to])
        if salary_min and salary_max:
            queryset = queryset.filter(
                salary__basic_salary__gte=salary_min, salary__basic_salary__lte=salary_max)
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
        # Apply ordering
        queryset = queryset.order_by(f'{order}{order_by}')
        paginator = StandardResultsSetPagination()
        paginator.page_size = request.query_params.get("page_size", 10)
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = EmployeeSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        serializer = EmployeeSerializer(queryset, many=True)
        return Response(serializer.data)
