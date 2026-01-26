"use client";

import React, { createContext, useContext } from "react";
import { useGetAllRFQs } from "../hooks/api";
import type { RFQDto } from "@/types";

/**
 * 🔍 SUPPLIER RFQS CONTEXT
 * Tedarikçi için tüm RFQ listesi context'i - sadece API verileri
 */

interface SupplierRFQsContextValue {
  rfqs: RFQDto[];
  rfqsListLoading: boolean;
  rfqsListError: any;
  refetch: () => void;
}

interface SupplierRFQsProviderProps {
  children: React.ReactNode;
}

const SupplierRFQsContext = createContext<SupplierRFQsContextValue | undefined>(
  undefined,
);

export function SupplierRFQsProvider({ children }: SupplierRFQsProviderProps) {
  // 📊 API DATA - Tüm aktif RFQ'ları al
  const { data, loading, error, refetch } = useGetAllRFQs();

  // Raw API verisini RFQDto[] formatına dönüştür
  const rfqs: RFQDto[] = data?.data?.content || [];

  // 🎯 CONTEXT VALUE
  const contextValue: SupplierRFQsContextValue = {
    rfqs,
    rfqsListLoading: loading,
    rfqsListError: error,
    refetch,
  };

  return (
    <SupplierRFQsContext.Provider value={contextValue}>
      {children}
    </SupplierRFQsContext.Provider>
  );
}

export function useSupplierRFQsContext() {
  const context = useContext(SupplierRFQsContext);
  if (context === undefined) {
    throw new Error(
      "useSupplierRFQsContext must be used within a SupplierRFQsProvider",
    );
  }
  return context;
}

export default SupplierRFQsContext;
