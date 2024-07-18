from django.db import models
from django.utils import timezone

class Note(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=1000, blank=True)
    content = models.CharField(max_length=10000, default='', blank=True)  
    isEditing = models.BooleanField(default=False)  
    pinStatus = models.BooleanField(default=False)  
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name  
