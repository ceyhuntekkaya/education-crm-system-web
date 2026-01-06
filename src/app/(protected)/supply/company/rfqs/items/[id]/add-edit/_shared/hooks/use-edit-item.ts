"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { RFQItemDto, RFQItemUpdateDto } from "@/types";
import { useRFQItemsContext } from "../../../_shared/contexts";

interface UseEditItemProps {
  rfqId: number;
  itemId: number;
  refetch?: () => void;
}

/**
 * RFQ Item güncelleme hook'u
 */
export const useEditItem = ({ rfqId, itemId, refetch }: UseEditItemProps) => {
  const { itemsListRefetch: refetchList } = useRFQItemsContext();

  const {
    mutate: putItem,
    loading: isLoading,
    error,
  } = usePut<RFQItemDto, RFQItemUpdateDto>(
    () => API_ENDPOINTS.SUPPLY.RFQ_ITEMS.UPDATE(rfqId, itemId),
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
        console.error("❌ RFQ Item güncellenirken hata:", error);
      },
    }
  );

  return {
    putItem,
    isLoading,
    error,
  };
};
