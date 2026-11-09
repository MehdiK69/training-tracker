from django.contrib.auth.models import User
from rest_framework import serializers
from .models import TrainingSession, Exercise

class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'session', 'name', 'sets', 'reps', 'weight', 'rest_seconds']

    def validate_session(self, session):
        request = self.context['request']
        if session.user != request.user:
            raise serializers.ValidationError("You can only add exercises to your own sessions.")
        return session

class TrainingSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingSession
        fields = ['id', 'title', 'description', 'date', 'duration', 'completed', 'exercises']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)