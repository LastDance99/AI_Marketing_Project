from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts'
    )
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    hit = models.PositiveIntegerField(default=0)
    # attachment = models.FileField(upload_to='attachments/', blank=True, null=True)

    def __str__(self):
        return self.title

class Attachment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='attachments'
    )
    file = models.FileField(upload_to='attachments/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Attachment {self.id} for Post {self.post.id}"
    


class EditorImage(models.Model):
    file = models.ImageField(upload_to='editor_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"EditorImage {self.id}"  
    
    #무 야 호~  
    