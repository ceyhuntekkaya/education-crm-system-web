"use client";

import React, { createContext, useContext } from "react";
import { useGetRFQsByCompany, useGetSuppliers } from "../hooks/api";
import type { RFQDto } from "@/types";

/**
 * 🔍 RFQS CONTEXT
 * Basitleştirilmiş context - sadece API verileri
 */

interface RFQsContextValue {
  rfqs: RFQDto[];
  rfqsListLoading: boolean;
  rfqsListError: any;
  refetch: () => void;
  // Suppliers data
  suppliersData: any;
  suppliersLoading: boolean;
}

interface RFQsProviderProps {
  children: React.ReactNode;
  companyId: number;
}

const RFQsContext = createContext<RFQsContextValue | undefined>(undefined);

export function RFQsProvider({ children, companyId }: RFQsProviderProps) {
  // 📊 API DATA - Sadece ham veriyi al
  const { data, loading, error, refetch } = useGetRFQsByCompany(companyId);

  // Suppliers data
  const { data: suppliersData, loading: suppliersLoading } = useGetSuppliers();

  // Raw API verisini RFQDto[] formatına dönüştür
  const rfqs: RFQDto[] = data?.data?.content || [];

  // 🎯 CONTEXT VALUE
  const contextValue: RFQsContextValue = {
    rfqs,
    rfqsListLoading: loading,
    rfqsListError: error,
    refetch,
    // Suppliers
    suppliersData,
    suppliersLoading,
  };

  return (
    <RFQsContext.Provider value={contextValue}>{children}</RFQsContext.Provider>
  );
}

export function useRFQsContext() {
  const context = useContext(RFQsContext);
  if (context === undefined) {
    throw new Error("useRFQsContext must be used within a RFQsProvider");
  }
  return context;
}

export default RFQsContext;
