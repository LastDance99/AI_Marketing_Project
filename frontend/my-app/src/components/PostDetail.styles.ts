// PostDetail.styles.ts
import styled from 'styled-components';

// 공통 스타일 변수
const fontFamily = `'Noto Sans KR', sans-serif`;
const cardMaxWidth = '640px';

export const HomeLink = styled.a`
    font-size: 20px;
    margin-bottom: 16px;
    cursor: pointer;
    color: #333;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: #0077ff;
    }
`;

export const Wrapper = styled.div`
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 48px 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: ${fontFamily};
`;

export const Card = styled.div`
    background-color: #ffffff;
    padding: 32px 40px;
    border-radius: 16px;
    width: 100%;
    max-width: ${cardMaxWidth};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;

    &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
`;

export const Title = styled.h2`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #212529;
`;

export const Author = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: #495057;
    margin-bottom: 10px;
`;

export const Content = styled.div`
    font-size: 18px;
    line-height: 1.8;
    color: #343a40;
    margin-bottom: 28px;
    word-break: break-word;
`;

export const DateText = styled.p`
    font-size: 14px;
    color: #868e96;
    text-align: right;
`;

export const DownloadLink = styled.a`
    display: inline-block;
    margin-top: 16px;
    font-size: 16px;
    color: #1976d2;
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover {
        color: #125ea6;
    }
`;
