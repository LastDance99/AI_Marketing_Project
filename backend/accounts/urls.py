from django.urls import path
from .views import (
    RegisterView, 
    MyPageView, 
    AdminOnlyView, 
    LogoutView, 
    CheckUsernameView, 
    CheckEmailView,
    CustumTokenObtainPairView,
    SendVerificationEmailView, 
    VerifyEmailCodeView,
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
    path('send-verification/', SendVerificationEmailView.as_view()),
    path('verify-code/', VerifyEmailCodeView.as_view()),
]
# 우린 회원가입, 로그인, 로그아웃 만들어야 함 모델 학습도 가능하지 근데 일단 
# 애니메이션 검색 기능을 우리 웹사이트에서 구현할수있다는게 너무 큰듯
# csv파일을 데이터베이스에 넣는건 그냥 ai 딸깍임 