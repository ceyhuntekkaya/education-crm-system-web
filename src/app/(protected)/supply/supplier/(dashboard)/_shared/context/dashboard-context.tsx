"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useSupplierDashboard, useOrders, useQuotations } from "../hooks";
import { SupplierSummaryDto, OrderDto, QuotationDto } from "@/types/dto/supply";

interface DashboardContextValue {
  // Dashboard Summary Data
  summary: SupplierSummaryDto;

  // Orders Data
  orders: OrderDto[];
  activeOrders: OrderDto[];
  ordersLoading: boolean;
  ordersError: string | null;
  refetchOrders: () => void;

  // Quotations Data
  quotations: QuotationDto[];
  pendingQuotations: QuotationDto[];
  quotationsLoading: boolean;
  quotationsError: string | null;
  refetchQuotations: () => void;

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

  // Sipariş verilerini getir
  const { orders, activeOrders, ordersLoading, ordersError, refetchOrders } =
    useOrders(supplierId);

  // Teklif verilerini getir
  const {
    quotations,
    pendingQuotations,
    quotationsLoading,
    quotationsError,
    refetchQuotations,
  } = useQuotations(supplierId);

  const value: DashboardContextValue = {
    summary,
    orders,
    activeOrders,
    ordersLoading,
    ordersError,
    refetchOrders,
    quotations,
    pendingQuotations,
    quotationsLoading,
    quotationsError,
    refetchQuotations,
    isLoading: summaryLoading || ordersLoading || quotationsLoading,
    error: summaryError || ordersError || quotationsError,
    refetchDashboard: () => {
      refetchSummary();
      refetchOrders();
      refetchQuotations();
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
