from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Friend_Request

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = '__all__'
        fields = ['id', 'username', 'email', 'location', 'phone_number', 'age', 'likes_and_hobbies', 'following', 'friends'] # ,'avatar'


class FriendsRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend_Request
        fields = '__all__'