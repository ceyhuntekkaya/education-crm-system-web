"use client";

import { useMemo } from "react";
import { useQuotationItemsContext } from "../../../_shared/contexts";
import { QuotationItemDto } from "@/types";

interface UseItemByIdProps {
  itemId: number | null;
}

/**
 * ID'ye göre Quotation Item getirme hook'u
 * Items listesinden ID'ye göre eşleşeni bulur (API çağrısı yapmaz)
 */
export const useItemById = ({ itemId }: UseItemByIdProps) => {
  // Items context'ten items listesini al
  const itemsContext = useQuotationItemsContext();
  const isLoading = itemsContext?.itemsListLoading || false;
  const error = itemsContext?.itemsListError || null;

  // Items listesinden itemId'ye göre eşleşeni bul
  const item = useMemo(() => {
    const items = itemsContext?.items || [];
    if (!itemId || items.length === 0) return null;
    return items.find((item) => item.id === itemId) || null;
  }, [itemId, itemsContext?.items]);

  // Refetch items listesini yeniden çeker
  const refetch = () => {
    if (itemsContext?.refetch) {
      itemsContext.refetch();
    }
  };

  return {
    item,
    isLoading,
    error,
    refetch,
  };
};
