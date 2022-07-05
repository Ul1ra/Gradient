from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.
User = get_user_model()


class Post(models.Model):
    author = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='user_posts', null=True)
    text_content = models.TextField(blank=True)
    created_date = models.DateField(auto_now_add=True)
    linked_content = models.CharField(max_length=250, blank=True)
    update_date = models.DateField(auto_now=True)
    liked_by = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='liked_posts', blank=True, null=True)
    shared_post = models.ForeignKey(to='Post', on_delete=models.CASCADE, related_name='shared_by', blank=True, null=True)
    #  social APIS

    def __str__(self):
        return f'Post {self.id} by {self.author}'

