from django.contrib import admin
from django.urls import path
from django.http import HttpResponse

from myapp.views import *


# Simple root endpoint for testing
def home(request):
    return HttpResponse("Hello, world!")

urlpatterns = [
    # Root and admin
    path('', home, name='home'),
    path('admin/', admin.site.urls),

    # User endpoints
    path('users/', RegisterView.as_view(), name='user-list'),
    path('users/<str:username>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', LoginView.as_view(), name='login'),

    # Quiz endpoints
    path('quizzes/', QuizView.as_view(), name='quiz-list'),

    # Code execution endpoints
    path("execute/", CodeExecutionView.as_view(), name="execute"),
    path("result/<str:token>/", CodeResultView.as_view(), name="result"),

]
