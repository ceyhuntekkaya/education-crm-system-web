"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponsePageQuotationDto,
  GetQuotationsByCompanyParams,
} from "@/types";

// ================== API HOOKS ==================

/**
 * Şirkete ait teklifleri getirir
 *
 * @param companyId - Şirket ID'si
 * @param params - Sayfalama parametreleri
 * @returns Teklifler listesi
 *
 * API Endpoint: GET /supply/quotations/by-company/{companyId}
 */
export const useGetQuotationsByCompany = (
  companyId: number,
  params?: GetQuotationsByCompanyParams,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponsePageQuotationDto>(
    companyId ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_COMPANY(companyId) : null,
    {
      params,
      enabled: options?.enabled ?? !!companyId,
    }
  );
};
