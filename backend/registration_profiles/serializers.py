from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Registration_Profile


class RegistrationProfilesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Registration_Profile
        fields = ['email', 'username', 'code', 'password', 'password_repeat', 'first_name', 'last_name']