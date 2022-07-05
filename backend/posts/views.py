from django.contrib.auth import get_user_model
from django.shortcuts import render

# Create your views here.
from rest_framework import status, filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView
from rest_framework.response import Response

from posts.models import Post
from posts.serializer import PostSerializer
from posts.permissions import IsOwnerOrReadOnlyAdmin

User = get_user_model()


class GetUserPosts(GenericAPIView):
    queryset = Post.objects.all().order_by('-created_date')
    serializer_class = PostSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = Post.objects.filter(username=user.posts.all()).order_by('-update_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GetAllFriends(GenericAPIView):
    queryset = Post.objects.all().order_by('-created_date')
    serializer_class = PostSerializer
    permission_classes = []

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(user=kwargs['id'])
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ListCreateCommentAPIView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        queryset = Post.objects.all().order_by('-update_date')
        serializer = self.get_serializer(queryset, many=True)
        filter_backends = [filters.SearchFilter]
        search_fields = ['username']
        return Response(serializer.data, status=status.HTTP_200_OK)


class RetrieveUpdateDestroyCommentAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [IsOwnerOrReadOnlyAdmin]
    lookup_field = 'id'


class ToggleLike(GenericAPIView):
    serializer_class = PostSerializer

    def post(self, request, *args, **kwargs):
        user_liked_posts = request.user.liked_posts
        post = Post.objects.get(id=kwargs.get('id'))
        if post in user_liked_posts.all():
            request.user.liked_posts.remove(post)
        else:
            request.user.liked_posts.add(post)
        return Response(status=status.HTTP_200_OK)


class GetFollowersPosts(GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = Post.objects.filter(author__in=user.followers.all()).order_by('-update_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class GetFollowingPosts(GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = Post.objects.filter(author__in=user.following.all()).order_by('-update_date')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)


class GetLikes(GenericAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = Post.objects.filter(liked_by=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
