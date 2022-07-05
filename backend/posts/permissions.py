from rest_framework.permissions import BasePermission


class IsOwnerOrReadOnlyAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.buyer == request.user:
            return True
        elif request.user.is_staff and request.method == 'GET':
            return True
        else:
            return False
