from rest_framework import permissions


class IsUserInGroupWithClerk(permissions.BasePermission):
    def has_permission(self, request, view):
        user_groups = request.user.groups.all()
        for group in user_groups:
            if request.method == 'GET':
                return True
            if request.method == 'POST' and group.permissions.filter(codename='add_employee').exists():
                return True
            if request.method == 'PUT' and group.permissions.filter(codename='change_employee').exists():
                return True
            if request.method == 'DELETE' and group.permissions.filter(codename='delete_employee').exists():
                return True
            if request.method == 'PATCH' and group.permissions.filter(codename='change_employee').exists():
                return True

        return False
