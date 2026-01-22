"use client";

import React, { createContext, useContext } from "react";
import { useGetQuotationsByCompany } from "../hooks/api";
import type { QuotationDto } from "@/types";

/**
 * 🔍 QUOTATIONS CONTEXT
 * Ortak teklif verileri
 */

interface QuotationsContextValue {
  // Liste verileri
  quotations: QuotationDto[];
  quotationsListLoading: boolean;
  quotationsListError: any;
  refetch: () => void;
}

interface QuotationsProviderProps {
  children: React.ReactNode;
  companyId: number;
}

const QuotationsContext = createContext<QuotationsContextValue | undefined>(
  undefined,
);

export function QuotationsProvider({
  children,
  companyId,
}: QuotationsProviderProps) {
  // 📊 API DATA - Teklif listesi
  const { data, loading, error, refetch } =
    useGetQuotationsByCompany(companyId);

  // Raw API verisini QuotationDto[] formatına dönüştür
  const quotations: QuotationDto[] = data?.data?.content || [];

  // 🎯 CONTEXT VALUE
  const contextValue: QuotationsContextValue = {
    // Liste verileri
    quotations,
    quotationsListLoading: loading,
    quotationsListError: error,
    refetch,
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
