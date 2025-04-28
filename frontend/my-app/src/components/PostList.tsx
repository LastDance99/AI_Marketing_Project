import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { toast } from 'react-toastify';
import { Post } from '../types/post';
import {
    Wrapper,
    Title,
    PostListContainer,
    PostItem,
    ActionLinks,
    WriteButton,
    TopBar,
    NavBar,
    NavButton,
    PostLink
} from './PostList.styles';

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchInput, setSearchInput] = useState(() => sessionStorage.getItem('searchQuery') || '');
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        console.log('✅ 로컬스토리지에서 가져온 username:', savedUsername);
        if (savedUsername) {
            setUsername(savedUsername);
        } else {
            setUsername(null);  // 명시적으로 null 처리
        }
    }, []);

    const fetchPosts = async (search: string = '') => {
        try {
            const response = await API.get<Post[]>("/posts/posts/", {
                params: { search },
            });
            setPosts(response.data);
        } catch (err) {
            console.error('게시글 로드 실패:', err);
        }
    };

    useEffect(() => {
        fetchPosts(searchInput);
    }, [searchInput]);

    const handleSearch = () => {
        sessionStorage.setItem('searchQuery', searchInput);
        fetchPosts(searchInput);
    };

    const handleEdit = (id: number) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                const token = localStorage.getItem('access');
                await API.delete(`/posts/posts/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPosts(posts.filter(p => p.id !== id));
            } catch (err) {
                console.error('삭제 실패:', err);
            }
        }
    };

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('access');
            const refreshToken = localStorage.getItem('refresh');

            await API.post('/accounts/logout/', { refresh: refreshToken }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('username');
            window.location.href = '/';

        } catch (err) {
            console.error('로그아웃 실패:', err);
            toast.error('로그아웃 실패');
        }
    };

    return (
        <Wrapper>
            <NavBar>
                {username ? (
                    <>
                        <span>👋 {username}님 환영합니다</span>
                        <NavButton onClick={handleLogout}>로그아웃</NavButton>
                    </>
                ) : (
                    <>
                        <Link to="/sign"><NavButton>회원가입</NavButton></Link>
                        <Link to="/login"><NavButton>로그인</NavButton></Link>
                    </>
                )}
            </NavBar>

            <Title>📄 게시글 목록</Title>

            <TopBar>
                <SearchBar
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    onSearch={handleSearch}
                />
                <WriteButton to="/write">✍️ 글 작성하기</WriteButton>
            </TopBar>

            <PostListContainer>
                {posts.map(post => (
                    // console.log("🔍 현재 로그인한 사용자:", username),
                    // console.log("🔍 게시글 작성자:", post.author),
                    // console.log("✅ 비교 결과:", post.author === username),
                    <PostItem key={post.id}>
                        <PostLink to={`/posts/${post.id}`}>
                            <div>
                                <span>{post.title}</span> - <span>{post.author}</span>
                            </div>
                        </PostLink>
                        <ActionLinks>
                            {username && post.author === username && (
                                <>
                                    <button className="edit" onClick={() => handleEdit(post.id)}>✏️ 수정</button>
                                    <button className="delete" onClick={() => handleDelete(post.id)}>삭제</button>
                                </>
                            )}
                        </ActionLinks>
                    </PostItem>
                ))}
            </PostListContainer>
        </Wrapper>
    );
};

export default PostList;
