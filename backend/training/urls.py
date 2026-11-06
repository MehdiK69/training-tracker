from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import TrainingSessionViewSet, ExerciseViewSet

router = DefaultRouter()
router.register('sessions', TrainingSessionViewSet, basename='session')
router.register('exercises', ExerciseViewSet, basename='exercise')

urlpatterns = router.urls + [
    path('auth/login/', obtain_auth_token),
]