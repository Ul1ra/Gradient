from django.urls import path

from .views import ListUsersAPIView, RetrieveUpdateUserProfileAPIView, RetrieveSingleUserView
from .views import CreateFollowAPIView, ListFollowersAPIView, ListFollowingAPIView
from .views import ListFriendsAPIView, CreateFriendsRequestAPIView, RetrieveUpdateDeleteFriendsRequestAPIView

urlpatterns = [
    # user info
    path('users/', ListUsersAPIView.as_view()),
    path('users/<int:user_id>/', RetrieveSingleUserView.as_view()),
    path('users/me/', RetrieveUpdateUserProfileAPIView.as_view()),

    # follow
    path('social/followers/toggle-follow/<int:user_id>/', CreateFollowAPIView.as_view()),
    path('social/followers/followers/', ListFollowersAPIView.as_view()),
    path('social/followers/following/', ListFollowingAPIView.as_view()),

    # friends
    path('social/friends/', ListFriendsAPIView.as_view()),
    path('social/friends/request/<int:user_id>/', CreateFriendsRequestAPIView.as_view()),
    path('social/friends/requests/<int:friend_request_id>/', RetrieveUpdateDeleteFriendsRequestAPIView.as_view()),
]