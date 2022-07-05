from django.contrib.auth import get_user_model
from django.db import models

# from users.admin import User
from posts.models import Post

User = get_user_model()

class Comment(models.Model):
    content = models.TextField(blank=False)
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='comments', null=True)
    created_date = models.DateField(auto_now_add=True)
    updated_date = models.DateField(auto_now=True)
    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='comments', null=True)

    def __str__(self):
        return f'Comment {self.id} by {self.author}'
