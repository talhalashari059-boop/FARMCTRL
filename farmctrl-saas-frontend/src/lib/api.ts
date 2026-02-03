
import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor for JWT
apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default apiClient;

// --- TYPES ---

export type Role = 'SUPER_ADMIN' | 'OWNER' | 'GM_OPERATIONS' | 'FARM_MANAGER' | 'BOOKKEEPER' | 'SUPERVISOR' | 'LABOUR';

export interface User {
    id: string;
    username: string;
    name: string;
    role: Role;
    farmId: string | null;
    farm?: {
        id: string;
        name: string;
    };
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

// --- API SERVICES ---

export const farmService = {
    getStats: () => apiClient.get('/admin/stats'),
    getStaff: () => apiClient.get('/staff'),
    addStaff: (data: any) => apiClient.post('/staff', data),

    getMachinery: () => apiClient.get('/machinery'),
    getFuelLogs: () => apiClient.get('/machinery/fuel/logs'),
    issueFuel: (data: any) => apiClient.post('/machinery/issue-fuel', data),

    getPivots: () => apiClient.get('/pivots'),
    updatePivot: (id: string, data: any) => apiClient.patch(`/pivots/${id}/status`, data),

    getAttendance: () => apiClient.get('/ops/attendance'),
    markAttendance: (data: any) => apiClient.post('/ops/attendance', data),

    getLeaves: () => apiClient.get('/ops/leaves'),
    applyLeave: (data: any) => apiClient.post('/ops/leaves', data),

    getTickets: () => apiClient.get('/tickets'),
    createTicket: (data: any) => apiClient.post('/tickets', data),
};
