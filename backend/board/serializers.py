from rest_framework import serializers


from .models import Post, Attachment, EditorImage


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ['id', 'file', 'uploaded_at']


class PostSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True)
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Post
        fields = [
            'id', 'author', 'title', 'content',
            'created_at', 'hit', 'attachments'
        ]
        read_only_fields = ['author', 'created_at', 'hit', 'attachments']

class EditorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditorImage
        fields = ['id', 'file', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']