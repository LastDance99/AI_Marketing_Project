// components/Auth/LoginForm.tsx
import React, { useState } from 'react';
import API from '../api/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    FormWrapper,
    StyledForm,
    FormTitle,
    Input,
    SubmitButton,
    HomeLink,
} from './LoginForm.styles';
import { LoginResponse } from '../types/user';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error('아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const res = await API.post<LoginResponse>('/accounts/login/', {
                username,
                password
            });

            // ✅ 로그인 성공 시 JWT 저장
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            localStorage.setItem('username', res.data.username);
            
            toast.success(`${res.data.username}님 환영합니다!`);
            console.log('현재 로그인된 사용자:', username);
            // ✅ 초기화 및 홈으로 이동
            // setUsername('');
            // setPassword('');
            navigate('/');
        } catch (err: any) {
            toast.error(err.response?.data?.error || '로그인 실패');
        }
    };

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleLogin}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <HomeLink>←</HomeLink>
            </Link>
                <FormTitle>🔐 로그인</FormTitle>
                <Input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <SubmitButton type="submit">로그인</SubmitButton>
            </StyledForm>
        </FormWrapper>
    );
};

export default LoginForm;
