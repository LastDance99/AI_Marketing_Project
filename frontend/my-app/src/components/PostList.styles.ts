// PostList.styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 공통 스타일 변수
const fontFamily = `'Noto Sans KR', sans-serif`;
const primaryColor = '#228be6';
const hoverColor = '#1c7ed6';
const shadowColor = 'rgba(0, 0, 0, 0.08)';

export const Wrapper = styled.div`
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 48px 16px;
    font-family: ${fontFamily};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const NavBar = styled.div`
    width: 100%;
    max-width: 720px;
    margin: 0 auto 16px auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
`;

export const NavButton = styled.button`
    background-color: #f1f3f5;
    color: #343a40;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
        background-color: #dee2e6;
    }
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 24px;
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 720px;
    margin-bottom: 28px;
`;

export const PostListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 720px;
`;

export const PostItem = styled.li`
    background-color: #ffffff;
    margin-bottom: 20px;
    padding: 20px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 10px ${shadowColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 6px 14px ${shadowColor};
    }

    a {
        color: ${primaryColor};
        text-decoration: none;
        font-size: 16px;
        font-weight: 500;

        &:hover {
        text-decoration: underline;
        }
    }

    button {
        padding: 8px 14px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .edit {
        background-color: #edf6ff;
        color: ${primaryColor};

        &:hover {
        background-color: #dbeeff;
        }
    }

    .delete {
        background-color: #fff5f5;
        color: #fa5252;

        &:hover {
        background-color: #ffe3e3;
        }
    }
`;

export const ActionLinks = styled.div`
    display: flex;
    gap: 10px;
`;

export const WriteButton = styled(Link)`
    background-color: ${primaryColor};
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    font-size: 15px;
    transition: background 0.2s ease;

    &:hover {
        background-color: ${hoverColor};
    }
`;

export const PostLink = styled(Link)`
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #212529;
    font-weight: bold;
    transition: background 0.2s ease;

    &:hover {
        background-color: #f1f3f5;
    }
`;
