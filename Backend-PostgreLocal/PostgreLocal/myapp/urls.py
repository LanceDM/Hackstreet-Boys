from django.urls import path
from myapp.views import UserView, UserDetailView, LoginView
from django.contrib import admin
from django.http import HttpResponse

def home(request):
    return HttpResponse("Hello, world!")

urlpatterns = [
    path('users/', UserView.as_view(), name='user-list'),
    path('users/<str:username>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/', admin.site.urls),
    path('', home),  # add this for root

]