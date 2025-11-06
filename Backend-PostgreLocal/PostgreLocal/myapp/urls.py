from django.urls import path
from myapp.views import UserView, UserDetailView, LoginView

urlpatterns = [
    path('users/', UserView.as_view(), name='user-list'),
    path('users/<str:username>/', UserDetailView.as_view(), name='user-detail'),
    path('login/', LoginView.as_view(), name='login'),
]