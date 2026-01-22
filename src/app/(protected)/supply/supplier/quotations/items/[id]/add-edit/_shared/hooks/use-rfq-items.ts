"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseListRFQItemDto } from "@/types";

interface UseRfqItemsProps {
  rfqId?: number;
  enabled?: boolean;
}

/**
 * RFQ items hook'u - Quotation item oluştururken RFQ itemlarını getirmek için
 */
export const useRfqItems = ({ rfqId, enabled = true }: UseRfqItemsProps) => {
  const {
    data: response,
    error,
    loading,
    refetch,
  } = useGet<ApiResponseListRFQItemDto>(
    rfqId && enabled ? API_ENDPOINTS.SUPPLY.RFQ_ITEMS.GET_ALL(rfqId) : null,
    {
      enabled: enabled && !!rfqId,
    },
  );

  return {
    data: response,
    rfqItems: response?.data || [],
    loading,
    error,
    refetch,
  };
};
