from rest_framework import serializers
from .models import TrainingSession, Exercise


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ['id', 'session', 'name', 'sets', 'reps', 'weight', 'rest_seconds']


class TrainingSessionSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingSession
        fields = ['id', 'title', 'description', 'date', 'duration', 'completed', 'exercises']