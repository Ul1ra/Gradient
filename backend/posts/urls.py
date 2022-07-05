from django.urls import path

from posts.views import ListCreateCommentAPIView, RetrieveUpdateDestroyCommentAPIView, ToggleLike, GetFollowersPosts, \
    GetFollowingPosts, GetLikes, GetUserPosts, GetAllFriends

urlpatterns = [
    path('', ListCreateCommentAPIView.as_view()),
    path('toggle-like/<int:id>/', ToggleLike.as_view()),
    path('<int:id>/', RetrieveUpdateDestroyCommentAPIView.as_view()),
    path('followers/', GetFollowersPosts.as_view()),
    path('following/', GetFollowingPosts.as_view()),
    path('likes/', GetLikes.as_view()),
    path('user/<int:user_id>/', GetUserPosts.as_view()),
    path('friends/', GetAllFriends.as_view()),
]
