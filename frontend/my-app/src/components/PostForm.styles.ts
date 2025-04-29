// PostForm.styles.ts
import styled from 'styled-components';

// 공통 스타일 변수
const fontFamily = `'Noto Sans KR', sans-serif`;
const primaryColor = '#228be6';
const hoverColor = '#1c7ed6';
const borderColor = '#dee2e6';
const shadowColor = 'rgba(0, 0, 0, 0.08)';

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

export const FormWrapper = styled.div`
    background-color: #f8f9fa;
    min-height: 100vh;
    padding: 48px 16px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: ${fontFamily};
`;

export const StyledForm = styled.form`
    background-color: #ffffff;
    padding: 36px 42px;
    border-radius: 16px;
    box-shadow: 0 4px 12px ${shadowColor};
    width: 100%;
    max-width: 640px;
    box-sizing: border-box;
`;

export const FormTitle = styled.h2`
    font-size: 26px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 28px;
    text-align: center;
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid ${borderColor};
    font-size: 16px;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: ${primaryColor};
        box-shadow: 0 0 0 4px rgba(34, 139, 230, 0.15);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 160px;
    padding: 14px;
    margin-bottom: 24px;
    border-radius: 8px;
    border: 1px solid ${borderColor};
    font-size: 16px;
    resize: vertical;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: ${primaryColor};
        box-shadow: 0 0 0 4px rgba(34, 139, 230, 0.15);
    }
`;

export const FileLabel = styled.label`
    display: inline-block;
    padding: 12px 20px;
    background-color: ${primaryColor};
    color: #ffffff;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;
    margin-top: 20px;
    margin-bottom: 16px;

    &:hover {
        background-color: ${hoverColor};
    }
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const FileName = styled.span`
    font-size: 15px;
    color: #495057;
    margin-left: 8px;
    margin-bottom: 20px;
    display: inline-block;
    word-break: break-word;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 16px 20px;
    font-size: 17px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background-color: ${primaryColor};
    color: #ffffff;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background-color: ${hoverColor};
    }
`;
