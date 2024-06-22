from ..models import Employee


class Search:

    def __init__(self):
        self.list = []

    def search(self, search_string, value):
        if search_string == 'id':
            self.list = Employee.objects.filter(id__icontains=value)
            return self.list
        if search_string == 'first_name':
         self.list = Employee.objects.filter(first_name__icontains=value)
         return self.list

        elif search_string == 'last_name':
            self.list = Employee.objects.filter(last_name__icontains=value)
            return self.list
        elif search_string == 'email':
            self.list = Employee.objects.filter(email__icontains=value)
            return self.list
        elif search_string == 'phone_number':
            self.list = Employee.objects.filter(phone_number__icontains=value)
            return self.lis
        elif search_string == 'date_of_birth':
            self.list = Employee.objects.filter(date_of_birth__icontains=value)
            return self.list
        elif search_string == 'date_of_hire':
            self.list = Employee.objects.filter(date_of_hire__icontains=value)
            return self.list
        elif search_string == 'position':
            self.list = Employee.objects.filter(position__icontains=value)
            return self.list
        elif search_string == 'gender':
            self.list = Employee.objects.filter(gender__icontains=value)
            return self.list
        else:
            return self.list
