"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseListRFQItemDto } from "@/types";

// ================== API HOOKS ==================

/**
 * RFQ'nun kalemlerini getirir
 *
 * @param rfqId - RFQ ID'si
 * @returns RFQ kalemleri listesi
 *
 * API Endpoint: GET /supply/rfqs/{id}/items
 */
export const useGetRFQItems = (
  rfqId: number,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponseListRFQItemDto>(
    rfqId ? API_ENDPOINTS.SUPPLY.RFQS.ITEMS(rfqId) : null,
    {
      enabled: options?.enabled ?? !!rfqId,
    }
  );
};
