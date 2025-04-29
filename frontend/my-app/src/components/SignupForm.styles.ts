import styled from 'styled-components';

// 공통 스타일 변수
const fontFamily = `'Noto Sans KR', sans-serif`;
const primaryColor = '#228be6';
const hoverColor = '#1c7ed6';
const borderColor = '#dee2e6';

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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
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

export const InputWrapper = styled.div`
    position: relative;
    margin-bottom: 20px; /* ✅ 입력창 여백 약간 여유롭게 */
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px;
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

export const Message = styled.div<{ available: boolean | null }>`
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    font-size: 14px;
    font-weight: 500;
    color: ${({ available }) =>
        available === null ? '#868e96' : available ? '#20c997' : '#fa5252'};
    white-space: nowrap;
    pointer-events: none;
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

export const EmailVerifyButton = styled.button`
    background-color: ${primaryColor};
    color: white;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin: 0 0 16px 0;  /* ✅ 상단 여백 제거, 하단만 남김 */
    display: inline-block;

    &:hover {
        background-color: ${hoverColor};
    }

    &:disabled {
        background-color: #adb5bd;
        cursor: not-allowed;
    }
`;
