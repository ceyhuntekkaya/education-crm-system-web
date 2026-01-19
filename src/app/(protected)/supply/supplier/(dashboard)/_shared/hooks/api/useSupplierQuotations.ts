"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { ApiResponseDto, PageQuotationDto } from "@/types";

/**
 * Tedarikçiye ait teklifleri getirir
 *
 * @param supplierId - Tedarikçi ID'si
 * @returns Sayfalanmış teklif listesi
 *
 * API Endpoint: GET /supply/quotations/by-supplier/{supplierId}
 */
export const useSupplierQuotations = (supplierId: number | null) => {
  return useGet<ApiResponseDto<PageQuotationDto>>(
    supplierId ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_SUPPLIER(supplierId) : null
  );
};
