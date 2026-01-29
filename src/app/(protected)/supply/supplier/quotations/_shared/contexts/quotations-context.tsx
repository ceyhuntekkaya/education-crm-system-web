"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import {
  useGetQuotationsBySupplier,
  useQuotationById,
  useQuotationItemsApi,
} from "../hooks/api";
import type { QuotationDto, QuotationItemDto } from "@/types";

/**
 * 🔍 QUOTATIONS CONTEXT
 * Ortak teklif verileri
 * - Teklif listesi (tüm teklifler)
 * - Tek teklif detayı (URL'deki id'ye göre)
 * - Teklif kalemleri (URL'deki id'ye göre)
 */

interface QuotationsContextValue {
  // Liste verileri
  quotations: QuotationDto[];
  quotationsListLoading: boolean;
  quotationsListError: any;
  refetch: () => void;
  // Tek Quotation (URL'deki id'ye göre)
  quotation: QuotationDto | null;
  quotationLoading: boolean;
  quotationId: number;
  quotationError: any;
  refetchQuotation: () => void;
  // Quotation Items (URL'deki id'ye göre)
  quotationItems: QuotationItemDto[];
  quotationItemsLoading: boolean;
  quotationItemsError: any;
  refetchQuotationItems: () => void;
}

interface QuotationsProviderProps {
  children: React.ReactNode;
  supplierId: number;
}

const QuotationsContext = createContext<QuotationsContextValue | undefined>(
  undefined,
);

export function QuotationsProvider({
  children,
  supplierId,
}: QuotationsProviderProps) {
  const params = useParams();
  const quotationId = params?.id ? Number(params.id) : 0;

  // 📊 API DATA - Teklif listesi
  const { data, loading, error, refetch } =
    useGetQuotationsBySupplier(supplierId);

  // 📊 API DATA - Tek Quotation (URL'de id varsa)
  const {
    quotation,
    isLoading: quotationLoading,
    error: quotationError,
    refetch: refetchQuotation,
  } = useQuotationById(quotationId);

  // 📊 API DATA - Quotation Items (URL'de id varsa)
  const {
    items: quotationItems,
    isLoading: quotationItemsLoading,
    error: quotationItemsError,
    refetch: refetchQuotationItems,
  } = useQuotationItemsApi(quotationId);

  // Raw API verisini QuotationDto[] formatına dönüştür
  const quotations: QuotationDto[] = data?.data?.content || [];

  // 🎯 CONTEXT VALUE
  const contextValue: QuotationsContextValue = {
    // Liste verileri
    quotations,
    quotationsListLoading: loading,
    quotationsListError: error,
    refetch,
    // Tek Quotation
    quotation,
    quotationLoading,
    quotationId,
    quotationError,
    refetchQuotation,
    // Quotation Items
    quotationItems,
    quotationItemsLoading,
    quotationItemsError,
    refetchQuotationItems,
  };

  return (
    <QuotationsContext.Provider value={contextValue}>
      {children}
    </QuotationsContext.Provider>
  );
}

export function useQuotationsContext() {
  const context = useContext(QuotationsContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationsContext must be used within a QuotationsProvider",
    );
  }
  return context;
}

export default QuotationsContext;
