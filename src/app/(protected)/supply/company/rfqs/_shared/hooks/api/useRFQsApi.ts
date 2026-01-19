"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponsePageRFQDto, GetRFQsByCompanyParams } from "@/types";

// ================== API HOOKS ==================

/**
 * Şirkete ait teklif taleplerini getirir
 *
 * @param companyId - Şirket ID'si
 * @param params - Sayfalama parametreleri
 * @returns Teklif talepleri listesi
 *
 * API Endpoint: GET /supply/rfqs/by-company/{companyId}
 */
export const useGetRFQsByCompany = (
  companyId: number,
  params?: GetRFQsByCompanyParams,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponsePageRFQDto>(
    companyId ? API_ENDPOINTS.SUPPLY.RFQS.BY_COMPANY(companyId) : null,
    {
      params,
      enabled: options?.enabled ?? !!companyId,
    }
  );
};
