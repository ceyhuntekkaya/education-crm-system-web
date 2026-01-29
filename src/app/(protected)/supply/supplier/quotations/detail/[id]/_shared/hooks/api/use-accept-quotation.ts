"use client";

import { usePatch } from "@/hooks/api";
import { API_ENDPOINTS } from "@/lib";
import type { QuotationDto, ApiResponseDto } from "@/types";

/**
 * Teklifi kabul etme API hook
 * @param quotationId - Quotation ID'si
 * @returns Teklif kabul fonksiyonu ve loading state
 */
export const useAcceptQuotation = (quotationId: number) => {
  const { mutate: acceptQuotation, loading: isAccepting } = usePatch<
    ApiResponseDto<QuotationDto>,
    Record<string, never>
  >(API_ENDPOINTS.SUPPLY.QUOTATIONS.ACCEPT(quotationId));

  return {
    acceptQuotation,
    isAccepting,
  };
};
