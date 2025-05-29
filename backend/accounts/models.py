from django.db import models

# Create your models here.

from django.utils import timezone
from datetime import datetime, timedelta

class EmailVerification(models.Model):
    email = models.EmailField(unique=True)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return self.created_at < timezone.now() - timedelta(minutes=5)  # 🔐 10분 유효
    def __str__(self):
        return f"{self.email} - {self.code}"