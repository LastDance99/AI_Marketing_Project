export interface Attachment {
    id: number;
    file: string;
    uploaded_at: string;
}

export interface Post {
    id: number;
    title: string;
    author: string;
    content: string;
    created_at: string;
    updated_at?: string;         // 선택적 필드
    s_mine?: boolean;            // 본인 글 여부 (프론트 전용)
    attachments?: Attachment[];
    };

export interface SearchBarProps {
    searchInput: string;
    setSearchInput: (val: string) => void;
    onSearch: () => void;
};

export interface UploadImageResponse {
    url: string;
};