import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-toastify';
import { Post, Attachment } from '../types/post';
import {
    FormWrapper,
    StyledForm,
    FormTitle,
    Input,
    SubmitButton,
    FileLabel,
    HiddenInput,
    HomeLink,
    FileName,
    FileUploadRow,
    FileList,
    ExistingFileRow,
} from './PostEdit.styles';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const BASE_URL = API.defaults.baseURL || '';

const PostEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<Attachment[]>([]); // ✅ Attachment 타입 배열로 변경
    const [deleteIds, setDeleteIds] = useState<number[]>([]); // ✅ 삭제할 첨부파일 ID 목록
    const [loading, setLoading] = useState(true);
    const editorRef = useRef<Editor>(null);

    useEffect(() => {
        // ✅ 게시글 불러오기
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('access');
                const res = await API.get<Post>(`/posts/posts/${id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setTitle(res.data.title);
                setContent(res.data.content || '');
                setExistingFiles(res.data.attachments || []); // ✅ 전체 Attachment 객체 저장
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

        const editorContent = editorRef.current?.getInstance().getHTML() || '';
        formData.append('content', editorContent);

        files.forEach(file => {
            formData.append('attachments', file);
        });

        if (deleteIds.length > 0) {
            formData.append('remove_attachment_ids', JSON.stringify(deleteIds));
        }

        try {
            const token = localStorage.getItem('access');
            await API.patch(`/posts/posts/${id}/`, formData, {
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

    // ✅ 파일 삭제 핸들러 (ID 기반 저장)
    const handleFileDelete = (attachmentId: number) => {
        if (!window.confirm('정말 이 파일을 삭제하시겠습니까?')) return;

        setDeleteIds(prev => [...prev, attachmentId]);
        setExistingFiles(prev => prev.filter(att => att.id !== attachmentId));

        console.log('🛠️ [삭제할 첨부파일 ID 저장 완료]:', [...deleteIds, attachmentId]);
    };

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <FormWrapper>
            <StyledForm onSubmit={handleUpdate}>
                {/* ✅ Home으로 돌아가기 링크 */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <HomeLink>←</HomeLink>
                </Link>

                <FormTitle>🛠 글 수정</FormTitle>

                <Input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="제목"
                    required
                />

                <Editor
                    ref={editorRef}
                    initialValue={content}
                    previewStyle="vertical"
                    height="400px"
                    initialEditType="wysiwyg"
                    useCommandShortcut
                    hideModeSwitch
                    usageStatistics={false}
                />

                {/* ✅ 첨부파일 리스트 + 삭제 버튼(❌) */}
                {existingFiles.map((fileObj) => {
                    const fileUrl = fileObj.file.startsWith('http') ? fileObj.file : `${BASE_URL}/${fileObj.file}`;

                    return (
                        <ExistingFileRow key={fileObj.id}>
                            📎
                            <a
                                href={fileUrl}
                                download
                                style={{ color: '#1c7ed6' }}
                            >
                                {fileUrl.split('/').pop()}
                            </a>
                            <button
                                type="button"
                                onClick={() => handleFileDelete(fileObj.id)} // ✅ ID 기반 삭제
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'red',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                }}
                            >
                                ❌
                            </button>
                        </ExistingFileRow>
                    );
                })}

                {/* ✅ 새 파일 추가 업로드 */}
                <FileUploadRow>
                    <FileLabel htmlFor="file">📎 새 파일 추가</FileLabel>
                    <HiddenInput
                        id="file"
                        type="file"
                        multiple
                        onChange={e => setFiles(Array.from(e.target.files || []))}
                    />
                    {files.length > 0 && (
                        <FileList>
                            {files.map((file, idx) => (
                                <FileName key={idx}>📄 {file.name}</FileName>
                            ))}
                        </FileList>
                    )}
                </FileUploadRow>

                <SubmitButton type="submit">수정하기</SubmitButton>
            </StyledForm>
        </FormWrapper>
    );
};

export default PostEdit;
