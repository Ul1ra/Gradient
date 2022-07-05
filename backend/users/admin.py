from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import Friend_Request

User = get_user_model()

admin.site.register(Friend_Request)

# Register your models here.
@admin.register(User)

class UserAdmin(UserAdmin):
    readonly_fields = ('date_joined',)

    # fields shown when creating a new instance
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')}
         ),
    )

    # fields when reading / updating an instance
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Profile info', {'fields': ('first_name', 'last_name', 'avatar', 'location', 'phone_number', 'age', 'likes_and_hobbies')}),
        ('Social', {'fields': ('following', 'friends')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
       #('Groups', {'fields': ('groups',)}),
    )
    # fields which are shown when looking at a list of instances
    list_display = ('email', 'first_name', 'last_name', 'is_superuser')
    ordering = ('email',)
