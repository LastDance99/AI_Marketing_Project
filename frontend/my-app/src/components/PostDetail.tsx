import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { Post } from '../types/post';
import { marked } from 'marked';
import { Link } from 'react-router-dom';
import {
    Wrapper,
    Card,
    Title,
    Author,
    Content,
    DateText,
    DownloadLink,
    HomeLink,
} from './PostDetail.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const BASE_URL = API.defaults.baseURL || '';

// ✅ 파일 URL 정리 함수
const getFullUrl = (filePath: string) => {
    if (filePath.startsWith('http')) {
        return filePath;  // 이미 절대 경로면 그대로 사용
    }
    return `${BASE_URL}/${filePath}`;  // 상대 경로면 BASE_URL 붙이기
};

// ✅ 이미지 파일 확장자 체크 함수
const isImage = (filePath: string) => {
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    return imageExtensions.test(filePath);
};

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await API.get<Post>(`/posts/posts/${id}/`);
                setPost(res.data);
            } catch (error) {
                console.error('게시글 상세 조회 실패:', error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return (
            <Wrapper>
                <Card>로딩 중...</Card>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Card>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <HomeLink>←</HomeLink>
                </Link>
                <Title>{post.title}</Title>
                <Author>작성자: {post.author}</Author>
                <Content dangerouslySetInnerHTML={{ __html: marked.parse(post.content) as string }} />

                {post.attachments && post.attachments.length > 0 && (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={10}
                        slidesPerView={2}
                        navigation
                        style={{ marginTop: '20px', maxWidth: '100%' }}
                    >
                        {post.attachments.map((fileObj, idx) => {
                            const fileUrl = getFullUrl(fileObj.file);
                            const isEditorImage = fileObj.file.includes('editor-images');
                            const isAttachmentImage = isImage(fileObj.file);

                            return (
                                <SwiperSlide key={idx}>
                                    {(isEditorImage || isAttachmentImage) ? (
                                        <img
                                            src={fileUrl}
                                            alt={`첨부이미지-${idx}`}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                objectFit: 'contain',
                                                maxHeight: '200px',
                                            }}
                                        />
                                    ) : (
                                        <DownloadLink href={fileUrl} download>
                                            📎 첨부파일 다운로드
                                        </DownloadLink>
                                    )}
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                )}

                <DateText>작성일: {new Date(post.created_at).toLocaleString()}</DateText>
            </Card>
        </Wrapper>
    );
};

export default PostDetail;
