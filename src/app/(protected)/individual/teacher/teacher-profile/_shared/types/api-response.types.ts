export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[] | null;
  timestamp: string;
  path?: string;
}
