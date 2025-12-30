"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, RFQDto, PageRFQDto } from "@/types";

/**
 * Şirkete ait ilanları (RFQ) getirir
 *
 * @param companyId - Şirket ID'si
 * @returns Sayfalanmış ilan listesi
 *
 * API Endpoint: GET /supply/rfqs/by-company/{companyId}
 */
export const useCompanyRFQs = (companyId: number | null) => {
  return useGet<ApiResponseDto<PageRFQDto>>(
    companyId ? API_ENDPOINTS.SUPPLY.RFQS.BY_COMPANY(companyId) : null
  );
};
