from django.db import models
from django.db.models.signals import post_migrate
from django.dispatch import receiver

class Module(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, unique=True)
    class Meta:
        db_table = 'module'
    def __str__(self):
        return self.title


class Lesson(models.Model):
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=100, unique=True, primary_key=True)
    pdf_url = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'lesson'

    def __str__(self):
        return f"{self.module.title} - {self.title}"


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50, unique=True)
    password_hash = models.TextField()
    full_name = models.CharField(max_length=100, blank=True, null=True)
    role = models.CharField(max_length=50, default='student')

    class Meta:
        db_table = 'user'

    def __str__(self):
        return self.username


class UserVideo(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='videos')
    video_url = models.TextField()

    class Meta:
        db_table = 'user_video'

    def __str__(self):
        return self.user.username


class EventList(models.Model):
    event_code = models.CharField(max_length=10, unique=True, primary_key=True)  # e.g. A1, A2, A3...
    action = models.CharField(max_length=50)                   # e.g. start_test
    description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'event_list'

    def __str__(self):
        return f"{self.event_code} - {self.action}"


class LogData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='logs')
    event = models.ForeignKey(EventList, on_delete=models.CASCADE, related_name='logs')
    timestamp = models.DateTimeField(auto_now_add=True)
    data = models.TextField(blank=True, null=True)
    num_actions = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'log_data'

    def __str__(self):
        return f"{self.user.username} - {self.event.event_code} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"


class Quiz(models.Model):
    quiz_difficulty = models.CharField(max_length=1)  # A, B, or C
    quiz_number = models.IntegerField()
    problem_title = models.CharField(max_length=100, unique=True)
    problem_description = models.TextField(blank=True, null=True)
    initial_code = models.TextField(blank=True, null=True)
    quiz_data = models.JSONField(blank=True, null=True)

    class Meta:
        db_table = 'quiz'
        unique_together = ('quiz_difficulty', 'quiz_number')  # composite-like key

    def __str__(self):
        return f"{self.quiz_difficulty}{self.quiz_number} - {self.problem_title}"

    @property
    def quiz_id(self):
        """Pseudo ID for internal use"""
        return f"{self.quiz_difficulty}{self.quiz_number}"



class UserQuizAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_attempts')
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempts')
    user_code_submission = models.TextField()
    is_correct = models.BooleanField(default=False)
    attempt_timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_quiz_attempt'

    def __str__(self):
          return f"{self.user.username} - {self.quiz.quiz_difficulty}{self.quiz.quiz_number} - {'Correct' if self.is_correct else 'Incorrect'}"
    
# run seed data after migrations
# python manage.py migrate && python manage.py seed

# @receiver(post_migrate)
# def seed_data(sender, **kwargs):
#     from myapp.management.seed import Command
#     command = Command()
#     command.handle()    