from django.db import models
from django.contrib.auth.models import User

class TrainingSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_sessions')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    date = models.DateField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes", null=True, blank=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} ({self.date})"

    class Meta:
        verbose_name = 'Training Session'
        verbose_name_plural = 'Training Sessions'
        ordering = ['-date']
        constraints = [
            models.UniqueConstraint(fields=['title', 'date', 'user'], name='unique_title_date_user')
        ]
        indexes = [
            models.Index(fields=['title', 'date']),
        ]

class Exercise(models.Model):
    session = models.ForeignKey(
        TrainingSession,
        on_delete=models.CASCADE,
        related_name='exercises',
    )
    name = models.CharField(max_length=100)
    sets = models.PositiveIntegerField(default=1)
    reps = models.PositiveIntegerField(default=1)
    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True, help_text="Weight in kg")
    rest_seconds = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.sets}x{self.reps})"