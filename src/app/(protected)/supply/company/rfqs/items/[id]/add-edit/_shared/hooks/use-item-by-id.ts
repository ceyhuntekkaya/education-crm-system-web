"use client";

import { useMemo } from "react";
import { useRFQItemsContext } from "../../../_shared/contexts";
import { RFQItemDto } from "@/types";

interface UseItemByIdProps {
  itemId: number | null;
}

/**
 * ID'ye göre RFQ Item getirme hook'u
 * Items listesinden ID'ye göre eşleşeni bulur (API çağrısı yapmaz)
 */
export const useItemById = ({ itemId }: UseItemByIdProps) => {
  // Items context'ten items listesini al
  const itemsContext = useRFQItemsContext();
  const items = itemsContext?.items || [];
  const isLoading = itemsContext?.itemsListLoading || false;
  const error = itemsContext?.itemsListError || null;

  // Items listesinden itemId'ye göre eşleşeni bul
  const item = useMemo(() => {
    if (!itemId || items.length === 0) return null;
    return items.find((item) => item.id === itemId) || null;
  }, [itemId, items]);

  // Refetch items listesini yeniden çeker
  const refetch = () => {
    if (itemsContext?.itemsListRefetch) {
      itemsContext.itemsListRefetch();
    }
  };

  return {
    item,
    isLoading,
    error,
    refetch,
  };
};
