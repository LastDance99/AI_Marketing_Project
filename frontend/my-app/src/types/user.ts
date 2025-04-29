export interface SignupResponse {
    message: string;
    access: string;
    refresh: string;
}

export interface LoginResponse {
    message: string;
    username: string;
    access: string;
    refresh: string;
}

export interface CheckFieldResponse {
    field: string;
    is_taken: boolean;
}

export interface EmailVerifyResponse {
    verified: boolean;
}

export interface UserInfo {
    username: string;
}