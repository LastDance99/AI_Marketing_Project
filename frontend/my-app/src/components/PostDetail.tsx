import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { Post } from '../types/post';
import { marked } from 'marked';
import {
    Wrapper,
    Card,
    Title,
    Author,
    Content,
    DateText,
    DownloadLink,
} from './PostDetail.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const BASE_URL = API.defaults.baseURL || '';

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
        return <Wrapper><Card>로딩 중...</Card></Wrapper>;
    }

    return (
        <Wrapper>
        <Card>
            <Title>{post.title}</Title>
            <Author>작성자: {post.author}</Author>
            <Content dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }} />

            {post.attachments && post.attachments.length > 0 && (
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={2}
                    navigation
                    style={{ marginTop: '20px', maxWidth: '100%' }}
                >
                    {post.attachments.map((fileObj, idx) => (
                        <SwiperSlide key={idx}>
                            {/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileObj.file) ? (
                            <img
                                src={`${BASE_URL}${fileObj.file}`}
                                alt={`첨부파일-${idx}`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                            ) : (
                            <DownloadLink href={`${BASE_URL}${fileObj.file}`} download>📎 파일 다운로드</DownloadLink>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            <DateText>작성일: {new Date(post.created_at).toLocaleString()}</DateText>
        </Card>
        </Wrapper>
    );
};

export default PostDetail;
