"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { QuotationItemDto } from "@/types";
import { useGetQuotationItems } from "../hooks/api";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { ApiResponseDto } from "@/types";
import type { QuotationDto } from "@/types";
import type { QuotationItemsContextValue } from "../types";

/**
 * 🔍 QUOTATION ITEMS CONTEXT
 * Basitleştirilmiş context - sadece API verileri
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
  // 📊 Quotation Detail API - rfqId almak için
  const { data: quotationResponse } = useGet<ApiResponseDto<QuotationDto>>(
    quotationId ? API_ENDPOINTS.SUPPLY.QUOTATIONS.BY_ID(quotationId) : null,
    {
      enabled: !!quotationId,
    },
  );

  const rfqId = quotationResponse?.data?.rfqId || null;

  // 📊 API DATA - Sadece ham veriyi al
  const { data, loading, error, refetch } = useGetQuotationItems(quotationId);

  // Raw API verisini QuotationItemDto[] formatına dönüştür
  const items: QuotationItemDto[] = useMemo(() => {
    if (!data?.data || !Array.isArray(data.data)) return [];
    return data.data.filter((item) => item && typeof item === "object");
  }, [data]);

  // 🎯 CONTEXT VALUE
  const contextValue: QuotationItemsContextValue = {
    quotationId,
    rfqId,
    items,
    itemsListLoading: loading,
    itemsListError: error,
    refetch,
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
