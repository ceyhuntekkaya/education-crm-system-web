"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { QuotationItemDto } from "@/types";
import type { QuotationItemsContextValue } from "../types";
import { useQuotationsContext } from "../../../../_shared";

/**
 * 🔍 QUOTATION ITEMS CONTEXT
 * Basitleştirilmiş context - ana context'ten veri alır
 * Filter, Sort, Search işlemleri DataCollectionLayout tarafından yönetilir
 */

interface QuotationItemsProviderProps {
  children: React.ReactNode;
  quotationId: number;
}

const QuotationItemsContext = createContext<
  QuotationItemsContextValue | undefined
>(undefined);

export function QuotationItemsProvider({
  children,
  quotationId,
}: QuotationItemsProviderProps) {
  // 📊 Ana context'ten quotation ve items verilerini al (tekrar API çağrısı yapmamak için)
  const {
    quotation,
    quotationItems,
    quotationItemsLoading,
    quotationItemsError,
    refetchQuotationItems,
  } = useQuotationsContext();

  const rfqId = quotation?.rfqId || null;

  // Raw API verisini QuotationItemDto[] formatına dönüştür
  const items: QuotationItemDto[] = useMemo(() => {
    if (!quotationItems || !Array.isArray(quotationItems)) return [];
    return quotationItems.filter((item) => item && typeof item === "object");
  }, [quotationItems]);

  // 🎯 CONTEXT VALUE
  const contextValue: QuotationItemsContextValue = {
    quotationId,
    rfqId,
    items,
    itemsListLoading: quotationItemsLoading,
    itemsListError: quotationItemsError,
    refetch: refetchQuotationItems,
  };

  return (
    <QuotationItemsContext.Provider value={contextValue}>
      {children}
    </QuotationItemsContext.Provider>
  );
}

export function useQuotationItemsContext() {
  const context = useContext(QuotationItemsContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationItemsContext must be used within a QuotationItemsProvider",
    );
  }
  return context;
}

export default QuotationItemsContext;
