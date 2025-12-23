"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useDashboardStats } from "../hooks";
import { OrderDto, QuotationDto, RFQDto } from "../hooks/api";

interface DashboardContextValue {
  // Stats Card Data
  activeOrders: OrderDto[]; // Aktif Siparişler
  pendingQuotations: QuotationDto[]; // Bekleyen Teklifler
  activeRFQs: RFQDto[]; // Aktif İlanlar

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
  companyId: number | null;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
  companyId,
}) => {
  // Stats Hook - Aktif siparişler, bekleyen teklifler ve aktif ilanlar
  const {
    activeOrders,
    pendingQuotations,
    activeRFQs,
    statsLoading,
    statsError,
    refetchStats,
  } = useDashboardStats(companyId);

  const value: DashboardContextValue = {
    // Stats Card Data
    activeOrders,
    pendingQuotations,
    activeRFQs,

    // Loading & Error
    isLoading: statsLoading,
    error: statsError,
    refetchDashboard: refetchStats,
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
