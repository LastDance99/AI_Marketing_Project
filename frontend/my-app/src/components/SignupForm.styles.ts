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
    box-sizing: border-box;
`;

export const FormTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #212529;
    margin-bottom: 24px;
    text-align: center;
`;

export const InputWrapper = styled.div`
    position: relative;      /* ✅ absolute 메시지를 위한 relative */
    margin-bottom: 32px;      /* ✅ Input + Message 공간 확보 */
`;

export const Input = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    font-size: 16px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #228be6;
        box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.1);
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

export const Message = styled.div<{ available: boolean | null }>`
    position: absolute;
    top: 2%;
    right: 16px;
    transform: translateY(50%);
    white-space: nowrap;
    font-size: 14px;
    color: ${({ available }) =>
        available === null ? '#000' : available ? 'green' : 'red'};
`;
