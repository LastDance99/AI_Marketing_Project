import React, { useEffect, useState, useRef } from 'react';
import API from '../api/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UploadImageResponse } from '../types/post';
import {
    FormWrapper,
    StyledForm,
    FormTitle,
    Input,
    SubmitButton,
    FileLabel,
    HiddenInput,
    FileName,
} from './PostForm.styles';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


const PostForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const editorRef = useRef<Editor>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.getInstance().setMarkdown(''); // ✅ 강제 초기화
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        if (!storedUser) {
        toast.error('로그인이 필요합니다.');
        navigate('/login');
        } else {
        setAuthor(storedUser);
        }
    }, [navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editorRef.current) {
        toast.error('에디터가 아직 준비되지 않았습니다.');
        return;
        }

        if (!author) {
        toast.error('로그인 후 작성하실 수 있습니다.');
        return;
        }

        const content = editorRef.current.getInstance().getMarkdown();
        if (!content.trim()) {
        toast.error('본문을 입력해주세요.');
        return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);

        files.forEach(file => {
            formData.append('attachments', file);
        });

        const token = localStorage.getItem('access');
        if (!token) {
        toast.error('토큰이 없습니다.');
        return;
        }

        try {
        await API.post('/posts/posts/', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            },
        });
        toast.success('글 작성 완료!');
        setTitle('');
        editorRef.current.getInstance().setMarkdown('');
        setFiles([]);
        navigate('/');
        } catch (error) {
        console.error('작성 실패:', error);
        toast.error('작성 실패');
        }
    };

    return (
        <FormWrapper>
        <StyledForm onSubmit={handleSubmit}>
            <FormTitle>✍️ 새 글 작성</FormTitle>

            <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목"
            required
            />

            {/* ✅ 에디터 */}
            <Editor
                ref={editorRef}
                initialValue=""
                previewStyle="vertical"
                height="400px"
                initialEditType="wysiwyg"
                useCommandShortcut
                hideModeSwitch={true}
                usageStatistics={false}
                hooks={{
                    addImageBlobHook: async (blob, callback) => {
                    try {
                        setUploading(true);
                        const formData = new FormData();
                        formData.append('file', blob);

                        const token = localStorage.getItem('access');
                        const res = await API.post<UploadImageResponse>('/posts/images/upload/', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                        });

                        const imageUrl = res.data.url;
                        callback(imageUrl, '업로드된 이미지');
                        toast.success('이미지 업로드 완료!');
                    } catch (error) {
                        console.error('이미지 업로드 실패:', error);
                        toast.error('이미지 업로드 실패');
                    } finally {
                        setUploading(false);
                    }
                    }
                }}
                />

                {uploading && (
                    <div style={{ marginTop: '10px', color: 'blue' }}>이미지 업로드 중...</div>
                )}

                <FileLabel htmlFor="file">📎 파일 선택</FileLabel>
                <HiddenInput
                id="file"
                type="file"
                multiple
                onChange={handleFileChange}
            />
            {files.map((file, idx) => (
                <FileName key={idx}>{file.name}</FileName>
            ))}

            <SubmitButton type="submit">작성하기</SubmitButton>
        </StyledForm>
        </FormWrapper>
    );
};

export default PostForm;
