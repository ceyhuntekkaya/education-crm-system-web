"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { QuotationItemDto, QuotationItemUpdateDto } from "@/types";
import { useQuotationItemsContext } from "../../../_shared/contexts";

interface UseEditItemProps {
  quotationId: number;
  itemId: number;
  refetch?: () => void;
}

/**
 * Quotation Item güncelleme hook'u
 */
export const useEditItem = ({
  quotationId,
  itemId,
  refetch,
}: UseEditItemProps) => {
  const { refetch: refetchList } = useQuotationItemsContext();

  const {
    mutate: putItem,
    loading: isLoading,
    error,
  } = usePut<QuotationItemDto, QuotationItemUpdateDto>(
    () => API_ENDPOINTS.SUPPLY.QUOTATION_ITEMS.UPDATE(quotationId, itemId),
    {
      onSuccess: (data) => {
        // Liste API'sine tekrar istek at
        refetchList();
        // Refetch varsa çalıştır (item detail için)
        if (refetch) {
          refetch();
        }
      },
      onError: (error) => {
        console.error("❌ Quotation Item güncellenirken hata:", error);
      },
    },
  );

  return {
    putItem,
    isLoading,
    error,
  };
};
