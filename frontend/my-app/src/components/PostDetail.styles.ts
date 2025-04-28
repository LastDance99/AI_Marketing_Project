// 🎨 PostDetail.styles.ts - 깔끔하게 리디자인
import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 48px 16px;
    display: flex;
    justify-content: center;
    font-family: 'Noto Sans KR', sans-serif;
`;

export const Card = styled.div`
    background: white;
    padding: 32px 40px;
    border-radius: 12px;
    max-width: 640px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`;

export const Title = styled.h2`
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 16px;
    color: #212529;
`;

export const Author = styled.p`
    font-weight: 500;
    font-size: 15px;
    color: #495057;
    margin-bottom: 8px;
`;

export const Content = styled.p`
    font-size: 17px;
    line-height: 1.7;
    margin-bottom: 24px;
    color: #343a40;
`;

export const DateText = styled.p`
    font-size: 13px;
    color: #868e96;
    text-align: right;
`;

export const DownloadLink = styled.a`
    display: inline-block;
    margin-top: 12px;
    color: #1976d2;
    font-size: 15px;
    text-decoration: underline;

    &:hover {
        color: #125ea6;
    }
`;

