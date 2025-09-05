export interface ApiResponseDto<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  errors?: unknown;
  timestamp: string;
  path?: string;
  status?: number;
}
