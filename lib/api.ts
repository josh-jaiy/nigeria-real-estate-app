import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Generic API methods
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.get(url, config),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.post(url, data, config),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.put(url, data, config),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.patch(url, data, config),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    apiClient.delete(url, config),
};

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
  }) => api.post('/auth/register', userData),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, newPassword: string) =>
    api.post('/auth/reset-password', { token, newPassword }),
  
  getProfile: () => api.get('/auth/profile'),
  
  refreshToken: () => api.post('/auth/refresh'),
};

// Properties API
export const propertiesApi = {
  getAll: (params?: any) => api.get('/properties', { params }),
  
  getById: (id: string) => api.get(`/properties/${id}`),
  
  create: (propertyData: any) => api.post('/properties', propertyData),
  
  update: (id: string, propertyData: any) => api.patch(`/properties/${id}`, propertyData),
  
  delete: (id: string) => api.delete(`/properties/${id}`),
  
  getFeatured: (limit?: number) => api.get('/properties/featured', { params: { limit } }),
  
  search: (query: string, limit?: number) => 
    api.get('/properties/search', { params: { q: query, limit } }),
  
  getNearby: (lat: number, lng: number, radius?: number) =>
    api.get('/properties/near', { params: { lat, lng, radius } }),
  
  getStats: () => api.get('/properties/stats'),
  
  incrementView: (id: string) => api.post(`/properties/${id}/view`),
};

// RentEasy API
export const rentEasyApi = {
  // Applications
  createApplication: (applicationData: any) =>
    api.post('/renteasy/applications', applicationData),
  
  getApplications: (params?: any) =>
    api.get('/renteasy/applications', { params }),
  
  getApplication: (id: string) =>
    api.get(`/renteasy/applications/${id}`),
  
  updateApplicationStatus: (id: string, status: string, notes?: string) =>
    api.patch(`/renteasy/applications/${id}/status`, { status, notes }),
  
  getApplicationStats: () =>
    api.get('/renteasy/applications/stats'),
  
  // Payment Plans
  createPaymentPlan: (planData: any) =>
    api.post('/renteasy/payment-plans', planData),
  
  getPaymentPlans: (params?: any) =>
    api.get('/renteasy/payment-plans', { params }),
  
  getPaymentPlan: (id: string) =>
    api.get(`/renteasy/payment-plans/${id}`),
  
  updatePaymentPlan: (id: string, planData: any) =>
    api.patch(`/renteasy/payment-plans/${id}`, planData),
  
  activatePaymentPlan: (id: string) =>
    api.post(`/renteasy/payment-plans/${id}/activate`),
  
  getMyPlans: (userId: string) =>
    api.get('/renteasy/my-plans', { params: { userId } }),
  
  getPaymentPlanStats: () =>
    api.get('/renteasy/payment-plans/stats'),
  
  // Scheduled Payments
  getScheduledPayments: (params?: any) =>
    api.get('/renteasy/payments', { params }),
  
  getScheduledPayment: (id: string) =>
    api.get(`/renteasy/payments/${id}`),
  
  processPayment: (id: string, paymentData: any) =>
    api.post(`/renteasy/payments/${id}/process`, paymentData),
  
  updateScheduledPayment: (id: string, paymentData: any) =>
    api.patch(`/renteasy/payments/${id}`, paymentData),
  
  getOverduePayments: () =>
    api.get('/renteasy/payments/overdue'),
  
  getUpcomingPayments: (days?: number) =>
    api.get('/renteasy/payments/upcoming', { params: { days } }),
  
  getPaymentStats: () =>
    api.get('/renteasy/payments/stats'),
  
  getPaymentHistory: (scheduleId: string) =>
    api.get(`/renteasy/payments/schedule/${scheduleId}/history`),
};

// Users API
export const usersApi = {
  getAll: (params?: any) => api.get('/users', { params }),
  
  getById: (id: string) => api.get(`/users/${id}`),
  
  create: (userData: any) => api.post('/users', userData),
  
  update: (id: string, userData: any) => api.patch(`/users/${id}`, userData),
  
  delete: (id: string) => api.delete(`/users/${id}`),
  
  changePassword: (id: string, passwordData: any) =>
    api.post(`/users/${id}/change-password`, passwordData),
  
  verify: (id: string) => api.post(`/users/${id}/verify`),
  
  getByRole: (role: string) => api.get(`/users/role/${role}`),
  
  getStats: () => api.get('/users/stats'),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
  
  getAnalytics: () => api.get('/dashboard/analytics'),
  
  getRecentActivities: () => api.get('/dashboard/recent-activities'),
  
  getPaymentOverview: () => api.get('/dashboard/payment-overview'),
  
  getPropertyOverview: () => api.get('/dashboard/property-overview'),
  
  getUserOverview: () => api.get('/dashboard/user-overview'),
};

// Inspections API
export const inspectionsApi = {
  getAll: (params?: any) => api.get('/inspections', { params }),
  
  getById: (id: string) => api.get(`/inspections/${id}`),
  
  create: (inspectionData: any) => api.post('/inspections', inspectionData),
  
  update: (id: string, inspectionData: any) => api.patch(`/inspections/${id}`, inspectionData),
  
  delete: (id: string) => api.delete(`/inspections/${id}`),
};

export default apiClient;
