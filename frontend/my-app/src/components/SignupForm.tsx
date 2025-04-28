import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    FormWrapper,
    StyledForm,
    FormTitle,
    InputWrapper,
    Input,
    SubmitButton,
    Message
} from './SignupForm.styles';
import { SignupResponse, CheckFieldResponse } from '../types/user';

const DEBOUNCE_DELAY = 500;  // 0.5초 후에 요청

const useDebouncedCheck = (
    value: string,
    endpoint: string,
    setMessage: (message: string) => void,
    setAvailable: (available: boolean | null) => void
) => {
    useEffect(() => {
        if (!value) {
            setMessage('');
            setAvailable(null);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                const res = await API.get<CheckFieldResponse>(`${endpoint}${value}`);
                if (!res.data.is_taken) {
                    setMessage('사용 가능합니다.');
                    setAvailable(true);
                } else {
                    setMessage('이미 사용 중입니다.');
                    setAvailable(false);
                }
            } catch (err) {
                console.error('중복확인 에러:', err);
                setMessage('중복 확인 중 오류 발생');
                setAvailable(false);
            }
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [value]);
};

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);
    const [emailMessage, setEmailMessage] = useState('');
    const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
    const navigate = useNavigate();

    // username 자동 중복확인
    useDebouncedCheck(
    username,
    '/accounts/check-username/?username=',
    setUsernameMessage,
    setIsUsernameAvailable
);

useDebouncedCheck(
    email,
    '/accounts/check-email/?email=',
    setEmailMessage,
    setIsEmailAvailable
);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password || !password2) {
            toast.error('모든 항목을 입력해주세요.');
            return;
        }

        if (isUsernameAvailable === false) {
            toast.error('아이디 중복확인을 통과해야 합니다.');
            return;
        }

        if (isEmailAvailable === false) {
            toast.error('이메일 중복확인을 통과해야 합니다.');
            return;
        }

        if (password.length < 6) {
            toast.error('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }

        if (password !== password2) {
            toast.error('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const res = await API.post<SignupResponse>('/accounts/register/', {
                username,
                email,
                password,
                password2,
            });

            toast.success(res.data.message || '회원가입 완료!');
            setUsername('');
            setEmail('');
            setPassword('');
            setPassword2('');
            setUsernameMessage('');
            setEmailMessage('');
            setIsUsernameAvailable(null);
            setIsEmailAvailable(null);

            navigate('/');
        } catch (err: any) {
            console.error('회원가입 에러:', err.response?.data);
            toast.error(err.response?.data?.error || '회원가입 실패');
        }
    };

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleSignup}>
                <FormTitle>📝 회원가입</FormTitle>

                <InputWrapper>
                    <Input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {usernameMessage && (
                        <Message available={isUsernameAvailable}>
                            {usernameMessage}
                        </Message>
                    )}
                </InputWrapper>

                <InputWrapper>
                    <Input
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {emailMessage && (
                        <Message available={isEmailAvailable}>
                            {emailMessage}
                        </Message>
                    )}
                </InputWrapper>

                <InputWrapper>
                    <Input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputWrapper>

                <InputWrapper>
                    <Input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </InputWrapper>
                <SubmitButton type="submit">가입하기</SubmitButton>
            </StyledForm>
        </FormWrapper>
    );
};

export default SignupForm;
