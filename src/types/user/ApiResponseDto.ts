export interface ApiResponseDto<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
  status: number;
}
