// 🎨 PostList.styles.ts - 최종 리디자인
import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const NavBar = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto 16px auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
`;

export const NavButton = styled.button`
    background-color: #f1f3f5;
    color: #343a40;
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #ced4da;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
        background-color: #dee2e6;
    }
`;

export const Wrapper = styled.div`
    padding: 48px 16px;
    background-color: #f8f9fa;
    min-height: 100vh;
    font-family: 'Noto Sans KR', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 24px;
`;

export const PostListContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 720px;
`;

export const PostItem = styled.li`
    background: white;
    margin-bottom: 20px;
    padding: 18px 24px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }

    a {
        color: #1c7ed6;
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
        color: #1c7ed6;

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
    background-color: #228be6;
    color: white;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
    font-size: 15px;
    transition: background 0.2s ease;

    &:hover {
        background-color: #1c7ed6;
    }
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 720px;
    margin-bottom: 28px;
`;

export const PostLink = styled(Link)`
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #000 !important;
    font-weight: bold;

    &:hover {
        background-color: #f0f0f0;
    }
`;