"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, QuotationDto, PageQuotationDto } from "@/types";

/**
 * Şirkete ait teklifleri getirir
 *
 * @param companyId - Şirket ID'si
 * @returns Sayfalanmış teklif listesi
 *
 * API Endpoint: GET /supply/quotations/by-company/{companyId}
 */
export const useCompanyQuotations = (companyId: number | null) => {
  return useGet<ApiResponseDto<PageQuotationDto>>(
    companyId ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_COMPANY(companyId) : null
  );
};
