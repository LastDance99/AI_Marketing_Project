from django.db import models

# Create your models here.

class Post(models.Model):
    author = models.CharField(max_length=30)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    hit = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title