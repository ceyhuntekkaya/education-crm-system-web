import React from "react";
import type { RFQDto, ApiResponseDto } from "@/types";
import type { MutationOptions } from "@/hooks/api";

/**
 * RFQ detail context için interface'ler
 */
export interface RFQDetailContextValue {
  rfqId: number;
  rfq: RFQDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  hasValidId: boolean;
  // RFQ Actions - Direkt mutate fonksiyonları
  publishRFQ: (
    data: Record<string, never>,
    mutationOptions?: MutationOptions<
      ApiResponseDto<RFQDto>,
      Record<string, never>
    >
  ) => Promise<ApiResponseDto<RFQDto> | null>;
  closeRFQ: (
    data: Record<string, never>,
    mutationOptions?: MutationOptions<
      ApiResponseDto<RFQDto>,
      Record<string, never>
    >
  ) => Promise<ApiResponseDto<RFQDto> | null>;
  cancelRFQ: (
    data: Record<string, never>,
    mutationOptions?: MutationOptions<
      ApiResponseDto<RFQDto>,
      Record<string, never>
    >
  ) => Promise<ApiResponseDto<RFQDto> | null>;
  // Action loading states
  isPublishing: boolean;
  isClosing: boolean;
  isCancelling: boolean;
}

export interface RFQDetailProviderProps {
  children: React.ReactNode;
  rfqId: number;
}
