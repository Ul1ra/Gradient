from rest_framework import serializers

from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author = serializers.CharField(max_length=120, required=False)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'post']
