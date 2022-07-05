from django.urls import path

from comments.views import RetrieveUpdateDestroyCommentAPIView

urlpatterns = [
    path('<int:id>/', RetrieveUpdateDestroyCommentAPIView.as_view()),
]