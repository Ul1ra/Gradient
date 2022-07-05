import random

from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class Registration_Profile(models.Model):
    code = models.IntegerField(default=code_generator)
    email = models.EmailField(unique=True)

    def __str__(self):
         return f'ID {self.pk}: Profile for {self.email} - code {self.code}'


