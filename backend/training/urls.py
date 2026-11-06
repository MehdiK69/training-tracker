from rest_framework.routers import DefaultRouter
from .views import TrainingSessionViewSet, ExerciseViewSet

router = DefaultRouter()
router.register('sessions', TrainingSessionViewSet, basename='session')
router.register('exercises', ExerciseViewSet, basename='exercise')

urlpatterns = router.urls