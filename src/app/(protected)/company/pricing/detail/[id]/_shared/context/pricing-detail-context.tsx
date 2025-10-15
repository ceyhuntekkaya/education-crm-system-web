"use client";

import React, { createContext, useContext } from "react";
import { useSchoolPricingById } from "../hooks";
import { PricingDetailContextValue, PricingDetailProviderProps } from "../types";

const PricingDetailContext = createContext<PricingDetailContextValue | undefined>(
  undefined
);

export const PricingDetailProvider: React.FC<PricingDetailProviderProps> = ({
  children,
  pricingId,
}) => {
  const { pricing, isLoading, error, refetch } = useSchoolPricingById(pricingId);

  const contextValue: PricingDetailContextValue = {
    pricingId,
    pricing,
    isLoading,
    error,
    refetch,
  };

  return (
    <PricingDetailContext.Provider value={contextValue}>
      {children}
    </PricingDetailContext.Provider>
  );
};

/**
 * PricingDetail context'ini kullanmak için hook
 */
export const usePricingDetail = (): PricingDetailContextValue => {
  const context = useContext(PricingDetailContext);
  if (context === undefined) {
    throw new Error("usePricingDetail must be used within a PricingDetailProvider");
  }
  return context;
};