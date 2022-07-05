from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from comments.models import Comment
from comments.serializers import CommentSerializer
from posts.models import Post


class RetrieveUpdateDestroyCommentAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        post = Post.objects.get(id=kwargs.get('id'))
        queryset = Comment.objects.filter(post=post)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Saving logged-in user to comment / comment to user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(author=request.user)

        # Adding comment to post
        serializer.save(post=Post.objects.get(id=kwargs.get('id')))

        return Response(serializer.data, status=status.HTTP_200_OK)
