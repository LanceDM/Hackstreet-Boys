from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class UserView(APIView):
  def get(self, request):
    output = [{"username": output.username, 
              "password_hash": output.password_hash, 
              "full_name": output.full_name, 
              "role": output.role} 
              for output in User.objects.all()]
    return Response(output)

  def post(self, request):
    # Handle both JSON and form data
    data = dict(request.data)
    
    # If data comes as arrays (from form submission), extract first element
    for key in list(data.keys()):
      if isinstance(data[key], list) and len(data[key]) > 0:
        data[key] = data[key][0]
    
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetailView(APIView):
  def get(self, request, username):
    try:
      user = User.objects.get(username=username)
    except User.DoesNotExist:
      return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    data = UserSerializer(user).data
    return Response(data, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
  def post(self, request):
    data = dict(request.data)
    for key in list(data.keys()):
      if isinstance(data[key], list) and len(data[key]) > 0:
        data[key] = data[key][0]

    username = data.get('username')
    password_hash = data.get('password_hash')
    if not username or not password_hash:
      return Response({"message": "username and password_hash are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
      user = User.objects.get(username=username)
    except User.DoesNotExist:
      return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    if user.password_hash != password_hash:
      return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    return Response(UserSerializer(user).data, status=status.HTTP_200_OK)
