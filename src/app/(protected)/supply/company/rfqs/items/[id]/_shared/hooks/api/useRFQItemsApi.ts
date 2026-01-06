"use client";

import { useGet } from "@/hooks";
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
    rfqId ? `/supply/rfqs/${rfqId}/items` : null,
    {
      enabled: options?.enabled ?? !!rfqId,
    }
  );
};
