// Genel API tipleri
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'institution' | 'user';
  institutionId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Institution {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth tipleri
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  institutionId?: string;
}

// Dashboard tipleri
export interface DashboardStats {
  totalUsers: number;
  totalInstitutions: number;
  activeUsers: number;
  newUsersThisMonth: number;
}

export interface RecentActivity {
  id: string;
  type: 'user_created' | 'user_login' | 'institution_created';
  description: string;
  timestamp: string;
  userId?: string;
  institutionId?: string;
}

// Form tipleri
export interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  role: 'institution' | 'user';
  institutionId?: string;
  password: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: 'institution' | 'user';
  institutionId?: string;
  isActive?: boolean;
}

export interface CreateInstitutionRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface UpdateInstitutionRequest {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
}

// API Response wrappers
export interface ApiSuccessResponse<T> {
  data: T;
  message: string;
  success: true;
}

export interface ApiErrorResponse {
  message: string;
  error: string;
  success: false;
  details?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// JSONPlaceholder API types (for examples and testing)
export * from '@/types/jsonplaceholder';
