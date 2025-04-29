// SearchBar.styles.ts
import styled from 'styled-components';

// 공통 스타일 변수
const primaryColor = '#228be6';
const hoverColor = '#1c7ed6';
const borderColor = '#ccc';

export const SearchGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    max-width: 480px;
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid ${borderColor};
    border-radius: 8px;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
        border-color: ${primaryColor};
        box-shadow: 0 0 0 4px rgba(34, 139, 230, 0.15);
    }
`;

export const SearchButton = styled.button`
    padding: 12px 20px;
    background-color: ${primaryColor};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background-color: ${hoverColor};
    }
`;
