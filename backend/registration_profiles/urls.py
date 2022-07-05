from django.urls import path

from .views import RegisterUserAPIView, ValidateUserAPIView

urlpatterns = [
    path('', RegisterUserAPIView.as_view()),
    path('validation/', ValidateUserAPIView.as_view()),
]