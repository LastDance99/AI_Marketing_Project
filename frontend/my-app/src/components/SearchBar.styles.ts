import styled from 'styled-components';


export const SearchGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 50%;
`;

export const SearchInput = styled.input`
    padding: 10px 14px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    transition: border 0.2s ease;

    &:focus {
        border-color: #228be6;
        box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.1);
    }
`;

export const SearchButton = styled.button`
    padding: 10px 16px;
    background-color: #228be6;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background-color: #1c7ed6;
    }
`;