from django.db import models


class Module(models.Model):
    title = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.title
    class Meta:
        db_table = 'module'

class Lesson(models.Model):
    module = models.ForeignKey(
        Module,
        on_delete=models.CASCADE,
        related_name='lessons'
    )
    title = models.CharField(max_length=100, unique=True)
    pdf_url = models.TextField(blank=True, null=True)
    def __str__(self):
        return f"{self.module.title} - {self.title}"
    class Meta:
        db_table = 'lesson'

class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password_hash = models.TextField()
    full_name = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=50, default='student')
    def __str__(self):
        return self.username
    class Meta:
        db_table = 'user'

class UserVideo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_videos')
    video_url = models.TextField()

    def __str__(self):
        return self.user.username
    class Meta:
        db_table = 'user_video'
