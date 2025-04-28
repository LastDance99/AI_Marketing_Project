from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, EditorImageUploadView

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('images/upload/', EditorImageUploadView.as_view(), name='editor-image-upload'),
]
