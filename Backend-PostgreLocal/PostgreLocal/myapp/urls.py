from django.urls import path, include, re_path
from django.contrib import admin
from myapp.views import UserView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', UserView.as_view(), name='user-list'),
]