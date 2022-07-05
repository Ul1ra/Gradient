from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime
from django.utils import timezone


# file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
def user_directory_path(instance, filename):
    return f'{instance.id}/{filename}'


class User(AbstractUser):
    # Field used for login
    USERNAME_FIELD = 'email'
    
    # Additional fields required when using createsuperuser
    REQUIRED_FIELDS = ['username']
    
    # Additional fields of user profile
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to=user_directory_path, blank=True, null=True)  # need to set path of media files
    location = models.TextField(blank=True)
    phone_number = models.TextField(blank=True)
    age = models.SmallIntegerField(blank=True, null=True)
    likes_and_hobbies = models.TextField(blank=True)
    
    # User Relations
    friends = models.ManyToManyField('User', related_name='is_friend_of', blank=True)
    following = models.ManyToManyField('User', related_name='followers', blank=True)
    
    # liked_posts will be created on posts
    # comments will be created on comments (author)
    # user_posts will be created on posts (author)
    # registration_profile will be created on registration_profile (user)
    
    def __str__(self):
        return f'User {self.pk}: {self.email}'


class Friend_Request(models.Model):
    friend_requests_from = models.ForeignKey(to=User, related_name='friend_requests_from', on_delete=models.CASCADE)
    friend_requests_to = models.ForeignKey(to=User, related_name='friend_requests_to', on_delete=models.CASCADE)
    request_status = models.TextField(default="Not available on create")
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Request {self.pk}: from User {self.friend_requests_from.id} to User {self.friend_requests_to.id} - {self.request_status}'
