from django.shortcuts import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .models import User, Quiz
from .serializer import UserSerializer, QuizSerializer


# -------------------------
# User Registration
# -------------------------
@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):

    def get(self, request):
        users = User.objects.all()
        data = [
            {
                "username": user.username,
                "password_hash": user.password_hash,
                "full_name": user.full_name,
                "role": user.role,
            }
            for user in users
        ]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        data = dict(request.data)

        # Flatten lists (for form-data requests)
        for key, value in data.items():
            if isinstance(value, list) and len(value) > 0:
                data[key] = value[0]

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------
# User Detail
# -------------------------
class UserDetailView(APIView):
  
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------------
# Login
# -------------------------
@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):

    def post(self, request):
        data = dict(request.data)

        for key, value in data.items():
            if isinstance(value, list) and len(value) > 0:
                data[key] = value[0]

        username = data.get('username')
        password_hash = data.get('password_hash')

        if not username or not password_hash:
            return Response(
                {"message": "username and password_hash are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        if user.password_hash != password_hash:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# -------------------------
# Quizzes
# -------------------------
class QuizView(APIView):
    def get(self, request):
        difficulty = request.GET.get('quiz_difficulty')
        number = request.GET.get('quiz_number')

        if difficulty and number:
            try:
                quiz = Quiz.objects.get(quiz_difficulty=difficulty, quiz_number=number)
                serializer = QuizSerializer(quiz)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Quiz.DoesNotExist:
                return Response({"error": "Quiz not found"}, status=status.HTTP_404_NOT_FOUND)

        # if no parameters → return all quizzes
        quizzes = Quiz.objects.all()
        serializer = QuizSerializer(quizzes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
