"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ApiResponseListQuotationItemDto,
  QuotationItemDto,
} from "@/types";

interface UseQuotationItemsProps {
  quotationId: number | null;
  enabled?: boolean;
}

/**
 * Quotation items hook'u - Bir quotation'a ait itemları getirmek için
 */
export const useQuotationItems = ({
  quotationId,
  enabled = true,
}: UseQuotationItemsProps) => {
  const {
    data: response,
    error,
    loading,
    refetch,
  } = useGet<ApiResponseListQuotationItemDto>(
    quotationId && enabled
      ? API_ENDPOINTS.SUPPLY.QUOTATION_ITEMS.GET_ALL(quotationId)
      : null,
    {
      enabled: enabled && !!quotationId,
    },
  );

  return {
    data: response,
    quotationItems: (response?.data || []) as QuotationItemDto[],
    loading,
    error,
    refetch,
  };
};
