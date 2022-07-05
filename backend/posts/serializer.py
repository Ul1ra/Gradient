from rest_framework import serializers

from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(max_length=120, required=False)

    class Meta:
        model = Post
        fields = '__all__'
