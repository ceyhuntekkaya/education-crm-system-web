"use client";

import { usePatch } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib";
import type { QuotationDto, ApiResponseDto } from "@/types";

/**
 * Teklifi gönderme API hook
 * @param quotationId - Quotation ID'si
 * @returns Teklif gönderme fonksiyonu ve loading state
 */
export const useSubmitQuotation = (quotationId: number) => {
  const { mutate: submitQuotation, loading: isSubmitting } = usePatch<
    ApiResponseDto<QuotationDto>,
    Record<string, never>
  >(API_ENDPOINTS.SUPPLY.QUOTATIONS.SUBMIT(quotationId));

  return {
    submitQuotation,
    isSubmitting,
  };
};
