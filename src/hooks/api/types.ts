import { AxiosRequestConfig } from 'axios';

// API Hook durumları
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API Hook seçenekleri
export interface ApiOptions extends AxiosRequestConfig {
  // Otomatik çalışma (GET için)
  enabled?: boolean;
  // Başarı callback'i
  onSuccess?: (data: unknown) => void;
  // Hata callback'i
  onError?: (error: string) => void;
  // Yükleme bitimi callback'i
  onFinally?: () => void;
}

// Mutation hook seçenekleri
export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: string, variables: TVariables) => void;
  onFinally?: (variables: TVariables) => void;
}

// Pagination için
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// API Response yapısı
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Paginated Response yapısı
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
