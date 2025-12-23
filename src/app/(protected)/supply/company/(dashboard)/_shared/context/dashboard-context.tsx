"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useOrders } from "../hooks";
import { usePendingQuotations } from "../hooks/usePendingQuotations";
import { useActiveRFQs } from "../hooks/useActiveRFQs";
import { OrderDto, QuotationDto, RFQDto } from "../hooks/api";

interface DashboardContextValue {
  // Stats Card Data
  activeOrders: OrderDto[]; // Aktif Siparişler (Filtrelenmiş)
  pendingQuotations: QuotationDto[]; // Bekleyen Teklifler
  activeRFQs: RFQDto[]; // Aktif İlanlar

  // Tüm Siparişler (Filtrelenmemiş)
  orders: OrderDto[];

  // Loading & Error States
  isLoading: boolean;
  ordersLoading: boolean;
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
  // Siparişleri getir (tüm ve aktif)
  const { orders, activeOrders, ordersLoading, ordersError, refetchOrders } =
    useOrders(companyId);

  // Pending Quotations Hook
  const {
    pendingQuotations,
    quotationsLoading,
    quotationsError,
    refetchQuotations,
  } = usePendingQuotations(companyId);

  // Active RFQs Hook
  const { activeRFQs, rfqsLoading, rfqsError, refetchRFQs } =
    useActiveRFQs(companyId);

  // Combined loading & error states
  const statsLoading = quotationsLoading || rfqsLoading;
  const statsError = quotationsError || rfqsError;

  const value: DashboardContextValue = {
    // Stats Card Data
    activeOrders,
    pendingQuotations,
    activeRFQs,

    // Tüm Siparişler
    orders,

    // Loading & Error
    isLoading: statsLoading,
    ordersLoading,
    error: statsError || ordersError,
    refetchDashboard: () => {
      refetchOrders();
      refetchQuotations();
      refetchRFQs();
    },
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
