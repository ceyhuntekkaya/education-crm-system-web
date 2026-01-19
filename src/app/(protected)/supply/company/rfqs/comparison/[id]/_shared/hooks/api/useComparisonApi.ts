"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseListQuotationComparisonDto } from "../../types";

// ================== API HOOKS ==================

/**
 * RFQ'nun teklif karşılaştırmasını getirir
 *
 * @param rfqId - RFQ ID'si
 * @returns Teklif karşılaştırma listesi
 *
 * API Endpoint: GET /supply/rfqs/{id}/comparison
 */
export const useGetRFQComparison = (
  rfqId: number,
  options?: { enabled?: boolean }
) => {
  const endpoint = rfqId ? API_ENDPOINTS.SUPPLY.RFQS.COMPARISON(rfqId) : null;

  return useGet<ApiResponseListQuotationComparisonDto>(endpoint, {
    enabled: options?.enabled ?? !!rfqId,
  });
};
