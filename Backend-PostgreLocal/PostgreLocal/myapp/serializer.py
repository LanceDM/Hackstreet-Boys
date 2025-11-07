from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'username': {'required': True},
            'password_hash': {'required': True},
            'full_name': {'required': False, 'allow_blank': True, 'allow_null': True},
            'role': {'required': False, 'default': 'student'},
        }