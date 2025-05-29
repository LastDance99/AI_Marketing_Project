from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework import viewsets, filters, status
from .models import Post, Attachment, EditorImage
from .serializers import PostSerializer, AttachmentSerializer, EditorImageSerializer
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
import json

# Create your views here.

# 진욱 추가 코드
class IsAuthorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # 읽기 권한은 누구나 가능
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # 쓰기 권한은 작성자만 가능
        return obj.author == request.user

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'author__username', 'content']
    #author는 user 모델을 참조하는 ForeignKey. icontains는 CharField나 TextField에서만 지원
    #ForeignKey를 거쳐서 참조하려면 __(더블 언더바) 문법을 써야 함 author → User.username 이니까 author__username
    permission_classes = [IsAuthorOrReadOnly]  # ✅ 로그인한 사용자만 작성 가능
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def create(self, request, *args, **kwargs):
        # override to return full nested data
        # print("FILES 확인", request.FILES)        # 오류 확인용
        # print("attachments 확인", request.data.getlist('attachments'))    #오류 확인용
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        post = serializer.instance
        output = self.get_serializer(post)
        return Response(output.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial
        )
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        # remove attachments if requested
        remove_ids = json.loads(request.data.get('remove_attachment_ids', '[]'))
        for att_id in remove_ids:
            Attachment.objects.filter(id=att_id, post=post).delete()
        # add new files
        files = request.FILES.getlist('attachments')
        for f in files:
            Attachment.objects.create(post=post, file=f)
        output = self.get_serializer(post)
        return Response(output.data)

    # 진욱 추가 코드
    def perform_create(self, serializer):
        post = serializer.save(author=self.request.user) # 글 작성 시 로그인한 유저를 작성자로 저장하는 코드
        for f in self.request.FILES.getlist('attachments'):
            Attachment.objects.create(post=post, file=f)


class EditorImageUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        # Toast UI Editor에서 보내는 'file' 키로 multipart 파일 수신
        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({'error': 'file이 필요합니다.'}, status=status.HTTP_400_BAD_REQUEST)

        image = EditorImage.objects.create(file=file_obj)
        serializer = EditorImageSerializer(image, context={'request': request})
        # 반환 형식: { "url": "<full_url_to_file>" }
        file_url = serializer.data['file']
        return Response({ 'url': request.build_absolute_uri(file_url) }, status=status.HTTP_201_CREATED)
    