export interface ApiResponseDto<T = any> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  status: number;
}
