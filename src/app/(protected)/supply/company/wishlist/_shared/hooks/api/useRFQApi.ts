"use client";

import { usePost } from "@/hooks";
import { ApiResponseDto } from "@/types";
import {
  RFQDto,
  RFQCreateDto,
  RFQType,
  RFQStatus,
} from "@/types/dto/supply/rfq.dto";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { MutationOptions } from "@/hooks/api/types";

/**
 * RFQ oluşturur
 *
 * @returns Mutation hook
 *
 * API Endpoint: POST /supply/rfqs
 */
export const useCreateRFQ = (
  options?: MutationOptions<ApiResponseDto<RFQDto>, RFQCreateDto>
) => {
  return usePost<ApiResponseDto<RFQDto>, RFQCreateDto>(
    API_ENDPOINTS.SUPPLY.RFQS.CREATE,
    options
  );
};

// Re-export types for convenience
export type { RFQDto, RFQCreateDto, RFQType, RFQStatus };
