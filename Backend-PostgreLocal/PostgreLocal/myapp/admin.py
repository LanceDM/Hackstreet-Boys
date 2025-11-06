from django.contrib import admin
from .models import Module, Lesson, User
# Register your models here.
admin.site.register(Module)
admin.site.register(Lesson)
admin.site.register(User)