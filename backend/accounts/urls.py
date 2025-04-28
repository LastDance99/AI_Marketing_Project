from django.urls import path
from .views import (
    RegisterView, 
    MyPageView, 
    AdminOnlyView, 
    LogoutView, 
    CheckUsernameView, 
    CheckEmailView,
    CustumTokenObtainPairView,
    )
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('register/', RegisterView.as_view()),           # 회원가입
    path('login/', CustumTokenObtainPairView.as_view(), name='token_obtain_pair'),  # ✅ 로그인 (JWT 발급)
    path('refresh/', TokenRefreshView.as_view()),        # ✅ 리프레시 토큰 재발급
    path('me/', MyPageView.as_view()),  # ✅ 내 정보 확인
    path('admin-only/', AdminOnlyView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('check-username/', CheckUsernameView.as_view()),
    path('check-email/',    CheckEmailView.as_view()),
]
# 우린 회원가입, 로그인, 로그아웃 만들어야 함 