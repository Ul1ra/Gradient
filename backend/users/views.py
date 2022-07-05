from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.response import Response
from .serializers import UserSerializer, FriendsRequestSerializer
from rest_framework import status, filters
from .models import Friend_Request

User = get_user_model()


# Create your views here.
class ListUsersAPIView(ListAPIView):
    """
    get:
    Get all the users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'location', 'age', 'phone_number', 'likes_and_hobbies']


class RetrieveSingleUserView(RetrieveAPIView):
    """
    #get:
    #Get specific user profile
    """
    queryset = User
    serializer_class = UserSerializer
    permission_classes = []
    lookup_url_kwarg = 'user_id'


class RetrieveUpdateUserProfileAPIView(RetrieveUpdateAPIView):
    """
    get:
    Get logged in user’s profile

    patch:
    Update the logged in user’s profile public info

    """
    queryset = User
    serializer_class = UserSerializer
    permission_classes = []

    def get_object(self):
        return self.request.user


class CreateFollowAPIView(GenericAPIView):
    """
    post:
    toggle follow/unfollow a user
    """

    def post(self, request, *args, **kwargs):
        currently_following = request.user.following.all()
        follow_user = User.objects.get(id=kwargs.get('user_id'))
        if follow_user in currently_following:
            request.user.following.remove(follow_user)
        else:
            request.user.following.add(follow_user)
        return Response(status=status.HTTP_200_OK)

class ListFollowersAPIView(ListAPIView):
    """
    get:
    list of all the followers
    """
    queryset = User
    serializer_class = UserSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        current_followers = request.user.followers.all()
        queryset = User.objects.filter(pk__in=current_followers)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ListFollowingAPIView(ListAPIView):
    """
    get:
    list of all the people the user is following
    """
    queryset = User
    serializer_class = UserSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        currently_following = request.user.following.all()
        queryset = User.objects.filter(pk__in=currently_following)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ListFriendsAPIView(ListAPIView):
    """
    get:
    list of all the followers
    """
    queryset = User
    serializer_class = UserSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        current_friends = request.user.friends.all()
        queryset = User.objects.filter(pk__in=current_friends)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreateFriendsRequestAPIView(GenericAPIView):
    """
    post:
    Send friend request to another user
    """
    queryset = User
    serializer_class = FriendsRequestSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        friend_requests_from = request.user
        friend_requests_to = User.objects.get(id=kwargs.get('user_id'))
        friend_request, created = Friend_Request.objects.get_or_create(friend_requests_from=friend_requests_from, friend_requests_to=friend_requests_to,request_status="Pending")
        if created:
            return Response(status=status.HTTP_200_OK)
        else:
            return HttpResponse("request already sent")


class RetrieveUpdateDeleteFriendsRequestAPIView(RetrieveUpdateDestroyAPIView):
    """
    get:
    Get details of a friend request

    post:
    Reject an open friend request

    patch:
    Accept an open friend request

    delete:
    Delete a friend request

    """
    queryset = Friend_Request
    serializer_class = FriendsRequestSerializer
    permission_classes = []
    lookup_url_kwarg = 'friend_request_id'

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        friend_request = Friend_Request.objects.get(id=kwargs.get('friend_request_id'))
        if friend_request.friend_requests_to == request.user and friend_request.request_status=="Pending":
            friend_request.request_status = "Rejected"
            friend_request.save()
            return HttpResponse("Request rejected")
        else:
            return HttpResponse("Cannot reject request")

    def patch(self, request, *args, **kwargs):
        friend_request = Friend_Request.objects.get(id=kwargs.get('friend_request_id'))
        if friend_request.friend_requests_to == request.user and friend_request.request_status=="Pending":
            friend_request.friend_requests_to.friends.add(friend_request.friend_requests_from)
            friend_request.friend_requests_from.friends.add(friend_request.friend_requests_to)
            friend_request.request_status = "Accepted"
            friend_request.save()
            return HttpResponse("Request accepted")
        else:
            return HttpResponse("Cannot accept request")