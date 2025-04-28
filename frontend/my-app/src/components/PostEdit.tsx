import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-toastify';
import { Post } from '../types/post';
import {
    FormWrapper,
    StyledForm,
    FormTitle,
    Input,
    SubmitButton,
    FileLabel,
    HiddenInput,
} from './PostEdit.styles';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const BASE_URL = API.defaults.baseURL || '';

const PostEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(''); // ✅ 별도로 content를 상태로 관리
    const [files, setFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<string[]>([]);
    const [deleteFiles, setDeleteFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const editorRef = useRef<Editor>(null);

    useEffect(() => {
        const fetchPost = async () => {
        try {
            const token = localStorage.getItem('access');
            const res = await API.get<Post>(`/posts/posts/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
            });

            setTitle(res.data.title);
            setContent(res.data.content || ''); // ✅ content를 상태에 저장
            setExistingFiles(res.data.attachments?.map(att => att.file) || []);
        } catch (error) {
            console.error('게시글 불러오기 실패:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchPost();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);

        const editorContent = editorRef.current?.getInstance().getMarkdown() || '';
        formData.append('content', editorContent);

        files.forEach(file => {
        formData.append('attachments', file);
        });

        deleteFiles.forEach(fileUrl => {
        formData.append('delete_attachments', fileUrl);
        });

        try {
        const token = localStorage.getItem('access');
        await API.put(`/posts/posts/${id}/`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
            },
        });
        toast.success('수정 완료!');
        navigate('/');
        } catch (err) {
        toast.error('수정 중 오류 발생');
        console.error(err);
        }
    };

    const toggleDelete = (fileUrl: string) => {
        if (deleteFiles.includes(fileUrl)) {
        setDeleteFiles(prev => prev.filter(url => url !== fileUrl));
        } else {
        setDeleteFiles(prev => [...prev, fileUrl]);
        }
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <FormWrapper>
        <StyledForm onSubmit={handleUpdate}>
            <FormTitle>🛠 글 수정</FormTitle>
            <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목"
            required
            />
            <Editor
            ref={editorRef}
            initialValue={content} // ✅ 처음 렌더링할 때만 초기값으로 세팅
            previewStyle="vertical"
            height="400px"
            initialEditType="wysiwyg"
            useCommandShortcut
            hideModeSwitch
            usageStatistics={false}
            />
            {existingFiles.map((fileUrl, idx) => (
            <div key={idx}>
                📎 기존 파일:
                <a href={`${BASE_URL}${fileUrl}`} download> 다운로드</a>
                <label style={{ marginLeft: '8px' }}>
                <input
                    type="checkbox"
                    checked={deleteFiles.includes(fileUrl)}
                    onChange={() => toggleDelete(fileUrl)}
                />
                삭제
                </label>
            </div>
            ))}
            <FileLabel htmlFor="file">📎 새 파일 추가</FileLabel>
            <HiddenInput
            id="file"
            type="file"
            multiple
            onChange={e => setFiles(Array.from(e.target.files || []))}
            />
            <SubmitButton type="submit">수정하기</SubmitButton>
        </StyledForm>
        </FormWrapper>
    );
};

export default PostEdit;
