"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useSupplierDashboard } from "../hooks";
import { SupplierSummaryDto } from "@/types/dto/supply";

interface DashboardContextValue {
  // Dashboard Summary Data
  summary: SupplierSummaryDto;

  // Loading & Error States
  isLoading: boolean;
  error: string | null;
  refetchDashboard: () => void;
}

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
  supplierId: number | null;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  supplierId,
}) => {
  // Dashboard verilerini getir
  const { summary, summaryLoading, summaryError, refetchSummary } =
    useSupplierDashboard(supplierId);

  const value: DashboardContextValue = {
    summary,
    isLoading: summaryLoading,
    error: summaryError,
    refetchDashboard: refetchSummary,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextValue => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};
