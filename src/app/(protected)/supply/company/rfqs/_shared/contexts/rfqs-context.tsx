"use client";

import React, { createContext, useContext } from "react";
import { useGetRFQsByCompany, useGetSuppliers, useRFQById } from "../hooks/api";
import type { RFQDto } from "@/types";
import { useParams } from "next/navigation";

/**
 * 🔍 RFQS CONTEXT
 * Basitleştirilmiş context - sadece API verileri
 * - RFQ listesi (tüm RFQ'lar)
 * - Tek RFQ detayı (URL'deki id'ye göre)
 */

interface RFQsContextValue {
  // RFQ listesi
  rfqs: RFQDto[];
  rfqsListLoading: boolean;
  rfqsListError: any;
  refetch: () => void;
  // Tek RFQ (URL'deki id'ye göre)
  rfq: RFQDto | null;
  rfqLoading: boolean;
  rfqId: number;
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
  const params = useParams();
  const rfqId = params?.id ? Number(params.id) : 0;

  // 📊 API DATA - RFQ listesi
  const { data, loading, error, refetch } = useGetRFQsByCompany(companyId);

  // 📊 API DATA - Tek RFQ (URL'de id varsa)
  const { rfq, isLoading: rfqLoading } = useRFQById(rfqId);

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
    // Tek RFQ
    rfq,
    rfqLoading,
    rfqId,
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
