from django.shortcuts import render

import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, CustumTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from .models import EmailVerification
from django.utils import timezone

# Create your views here.



    
class CustumTokenObtainPairView(TokenObtainPairView):   
    serializer_class = CustumTokenObtainPairSerializer

class CheckUsernameView(APIView):
    """username 중복 체크"""
    def get(self, request):
        username = request.query_params.get('username', '')
        if not username:
            return Response({'detail': 'username 파라미터 필요'}, status=status.HTTP_400_BAD_REQUEST)
        exists = User.objects.filter(username=username).exists()
        return Response({'field': 'username', 'is_taken': exists})

class CheckEmailView(APIView):
    """email 중복 체크"""
    def get(self, request):
        email = request.query_params.get('email', '')
        if not email:
            return Response({'detail': 'email 파라미터 필요'}, status=status.HTTP_400_BAD_REQUEST)
        exists = User.objects.filter(email=email).exists()
        return Response({'field': 'email', 'is_taken': exists})

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "회원가입 완료"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyPageView(APIView):
    permission_classes = [IsAuthenticated]  # ✅ 인증된 사용자만 접근 가능

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "id": user.id
        })

class AdminOnlyView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        return Response({"message": "관리자만 접근 가능한 페이지입니다."})
    


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "로그아웃 완료"}, status=205)
        except Exception as e:
            return Response({"error": str(e)}, status=400)



    
class SendVerificationEmailView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': '이메일이 필요합니다.'}, status=400)

        # ✅ 무조건 새 코드 발급
        code = str(random.randint(100000, 999999))

        # ✅ 이전 코드 무효화 (덮어쓰기)
        EmailVerification.objects.update_or_create(
            email=email,
            defaults={'code': code, 'created_at': timezone.now()}
        )

        # ✅ 메일 발송
        send_mail(
            subject='[김대원 임시 이메일] 이메일 인증 코드',
            message=f'인증 코드: {code}',
            from_email='simyuong68@gmail.com',
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({'message': '인증 코드가 이메일로 전송되었습니다.'}, status=200)
    
    
class VerifyEmailCodeView(APIView):
    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')

        if not email or not code:
            return Response({'error': '이메일과 코드가 필요합니다.'}, status=400)

        try:
            record = EmailVerification.objects.get(email=email)

            # ✅ 조건: 코드 일치 + 유효시간 내
            if record.code == code:
                if not record.is_expired():
                    return Response({'verified': True}, status=200)
                else:
                    return Response({'verified': False, 'error': '인증 코드가 만료되었습니다.'}, status=400)
            else:
                return Response({'verified': False, 'error': '인증 코드가 올바르지 않습니다.'}, status=400)

        except EmailVerification.DoesNotExist:
            return Response({'error': '해당 이메일에 대한 인증 요청이 없습니다.'}, status=404)
        
        