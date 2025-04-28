// 🎨 PostEdit.styles.ts - 깔끔하게 리디자인
import styled from 'styled-components';

export const FormWrapper = styled.div`
    background-color: #f8f9fa;
    padding: 48px 16px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    font-family: 'Noto Sans KR', sans-serif;
`;

export const StyledForm = styled.form`
    background: white;
    padding: 32px 40px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 640px;
`;

export const FormTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 24px;
    text-align: center;
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    font-size: 16px;
    transition: border 0.2s ease;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #228be6;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    min-height: 160px;
    padding: 12px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    font-size: 16px;
    resize: vertical;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #228be6;
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 14px 20px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background-color: #228be6;
    color: white;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background-color: #1c7ed6;
    }
`;

export const FileLabel = styled.label`
    display: inline-block;
    padding: 10px 18px;
    background-color: #228be6;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;
    margin-bottom: 12px;

    &:hover {
        background-color: #1c7ed6;
    }
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const FileName = styled.span`
    font-size: 14px;
    color: #495057;
    margin-left: 4px;
    display: inline-block;
    margin-bottom: 16px;
`;