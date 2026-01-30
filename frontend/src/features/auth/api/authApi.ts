import axios from 'axios';

// Fallback to direct axios if global instance not found immediately, 
// but we will update this to use the shared instance once found.
// The backend is at port 8083.
const API_URL = 'http://localhost:8083/api/v1/identity/auth';

export interface LoginRequest {
    domain: string;
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    tenantId: string;
    userId: string;
    role: string;
    fullName: string;
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, data);
    return response.data;
};
