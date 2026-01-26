"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseListRFQDto } from "@/types";

// ================== API HOOKS ==================

/**
 * Tüm aktif RFQ'ları getirir (Tedarikçi için)
 *
 * @returns Teklif talepleri listesi
 *
 * API Endpoint: GET /supply/rfqs/active
 */
export const useGetAllRFQs = (options?: { enabled?: boolean }) => {
  return useGet<ApiResponseListRFQDto>(API_ENDPOINTS.SUPPLY.RFQS.ACTIVE, {
    enabled: options?.enabled,
  });
};
