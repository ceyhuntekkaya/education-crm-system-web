"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { PricingContextType } from "../types";
import { useSchoolPricing } from "../hooks";
import { useCompany } from "../../../_shared";

const PricingContext = createContext<PricingContextType | undefined>(undefined);

interface PricingProviderProps {
  children: ReactNode;
}

export const PricingProvider: React.FC<PricingProviderProps> = ({
  children,
}) => {
  // Company context'ten seçili okul ID'sini al
  const { selectedSchool } = useCompany();

  // Pricing hook'unu kullan
  const { schoolPricings, pricingLoading, pricingError, refetchPricings } =
    useSchoolPricing(selectedSchool?.id || null);

  const contextValue: PricingContextType = {
    schoolPricings,
    pricingLoading,
    pricingError,
    refetchPricings,
  };

  return (
    <PricingContext.Provider value={contextValue}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = (): PricingContextType => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
};
