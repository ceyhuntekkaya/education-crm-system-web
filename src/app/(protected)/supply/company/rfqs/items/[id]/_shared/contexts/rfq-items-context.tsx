"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { RFQItemDto } from "@/types";
import { useGetRFQItems } from "../hooks/api";

/**
 * 🔍 RFQ ITEMS CONTEXT
 * Basitleştirilmiş context - sadece API verileri
 * Filter, Sort, Search işlemleri DataCollectionLayout tarafından yönetilir
 */

interface RFQItemsContextValue {
  rfqId: number;
  items: RFQItemDto[];
  itemsListLoading: boolean;
  itemsListError: any;
  refetch: () => void;
  uniqueCategories: { id: number; name: string }[];
}

interface RFQItemsProviderProps {
  children: React.ReactNode;
  rfqId: number;
}

const RFQItemsContext = createContext<RFQItemsContextValue | undefined>(
  undefined,
);

export function RFQItemsProvider({ children, rfqId }: RFQItemsProviderProps) {
  // 📊 API DATA - Sadece ham veriyi al
  const { data, loading, error, refetch } = useGetRFQItems(rfqId);

  // Raw API verisini RFQItemDto[] formatına dönüştür
  const items: RFQItemDto[] = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];
    return data.data.filter((item) => item && typeof item === "object");
  }, [data]);

  // 🏷️ UNIQUE CATEGORIES (raw data'dan)
  const uniqueCategories = useMemo(() => {
    const categoryMap = new Map<number, string>();
    items.forEach((item) => {
      if (item.categoryId && item.categoryName) {
        categoryMap.set(item.categoryId, item.categoryName);
      }
    });
    return Array.from(categoryMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  // 🎯 CONTEXT VALUE
  const contextValue: RFQItemsContextValue = {
    rfqId,
    items,
    itemsListLoading: loading,
    itemsListError: error,
    refetch,
    uniqueCategories,
  };

  return (
    <RFQItemsContext.Provider value={contextValue}>
      {children}
    </RFQItemsContext.Provider>
  );
}

export function useRFQItemsContext() {
  const context = useContext(RFQItemsContext);
  if (context === undefined) {
    throw new Error(
      "useRFQItemsContext must be used within a RFQItemsProvider",
    );
  }
  return context;
}

export default RFQItemsContext;
