from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, CustumTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView


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


