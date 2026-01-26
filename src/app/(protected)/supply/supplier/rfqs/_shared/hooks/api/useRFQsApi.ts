"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponsePageRFQDto, GetAllRFQsParams } from "@/types";

// ================== API HOOKS ==================

/**
 * Tüm aktif RFQ'ları getirir (Tedarikçi için)
 *
 * @param params - Sayfalama parametreleri
 * @returns Teklif talepleri listesi
 *
 * API Endpoint: GET /supply/rfqs
 */
export const useGetAllRFQs = (
  params?: GetAllRFQsParams,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponsePageRFQDto>(API_ENDPOINTS.SUPPLY.RFQS.LIST, {
    params,
    enabled: options?.enabled,
  });
};
