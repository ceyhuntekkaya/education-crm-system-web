"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useParams } from "next/navigation";
import type { ApiResponseListQuotationComparisonDto } from "@/types/dto/supply/quotation.dto";

/**
 * RFQ'nun tekliflerini getirir
 *
 * @param rfqId - RFQ ID'si
 * @returns RFQ teklifleri listesi
 *
 * API Endpoint: GET /supply/rfqs/{id}/quotations
 */
export const useRFQQuotationsApi = () => {
  const params = useParams();
  const rfqId = params?.id ? Number(params.id) : 0;

  const { data, loading, error, refetch } =
    useGet<ApiResponseListQuotationComparisonDto>(
      rfqId ? API_ENDPOINTS.SUPPLY.RFQS.QUOTATIONS(rfqId) : null,
      {
        enabled: !!rfqId,
      }
    );

  return {
    quotations: data?.data || [],
    isLoading: loading,
    error: error ? new Error(error) : null,
    refetch,
    isRefetching: loading,
    rfqId,
  };
};
