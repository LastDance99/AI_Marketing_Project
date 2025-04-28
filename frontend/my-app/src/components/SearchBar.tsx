import React from 'react';
import { SearchBarProps } from '../types/post';
import { SearchInput, SearchButton, SearchGroup } from './SearchBar.styles';
import API from '../api/api';  // API 인스턴스를 사용

const SearchBar = ({ searchInput, setSearchInput, onSearch }: SearchBarProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 폼 기본 제출 방지
            onSearch(); // 검색 실행
        }
    };

    // 수정된 onSearch 구현
    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('access');
            const response = await API.get(`/posts/posts/`, {
                params: { search: searchInput },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data); // 검색된 데이터 처리
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        }
    };

    return (
        <SearchGroup>
            <SearchInput
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown} // 엔터 키 감지
                placeholder="검색어 입력"
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchGroup>
    );
};

export default SearchBar;