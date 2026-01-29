"use client";

import { usePatch } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib";
import type { QuotationDto, ApiResponseDto } from "@/types";

/**
 * Teklifi reddetme API hook
 * @param quotationId - Quotation ID'si
 * @returns Teklif reddetme fonksiyonu ve loading state
 */
export const useRejectQuotation = (quotationId: number) => {
  const { mutate: rejectQuotation, loading: isRejecting } = usePatch<
    ApiResponseDto<QuotationDto>,
    Record<string, never>
  >(API_ENDPOINTS.SUPPLY.QUOTATIONS.REJECT(quotationId));

  return {
    rejectQuotation,
    isRejecting,
  };
};
