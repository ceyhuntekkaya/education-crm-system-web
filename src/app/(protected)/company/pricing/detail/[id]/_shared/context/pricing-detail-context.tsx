"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useSchoolPricingById } from "../hooks";
import {
  PricingDetailContextValue,
  PricingDetailProviderProps,
} from "../types";
import { usePricing } from "../../../../_shared";
import { useCompany } from "@/app/(protected)/company/_shared";

const PricingDetailContext = createContext<
  PricingDetailContextValue | undefined
>(undefined);

export const PricingDetailProvider: React.FC<PricingDetailProviderProps> = ({
  children,
  pricingId,
}) => {
  const { selectedSchool } = useCompany();
  const { schoolPricings, pricingLoading, pricingError, refetchPricings } =
    usePricing();

  // Üst context (PricingProvider) zaten aynı school ID ile veri çekiyorsa, tekrar istek atma
  const parentHasData = selectedSchool?.id === pricingId;

  const parentPricing = useMemo(
    () => (parentHasData ? schoolPricings?.[0] || null : null),
    [parentHasData, schoolPricings],
  );

  // Sadece üst context'te veri yoksa kendi isteğini at
  const {
    pricing: ownPricing,
    isLoading: ownLoading,
    error: ownError,
    refetch: ownRefetch,
  } = useSchoolPricingById(parentHasData ? 0 : pricingId);

  const contextValue: PricingDetailContextValue = {
    pricingId,
    pricing: parentHasData ? parentPricing : ownPricing,
    isLoading: parentHasData ? pricingLoading : ownLoading,
    error: parentHasData ? pricingError : ownError,
    refetch: parentHasData ? refetchPricings : ownRefetch,
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
    throw new Error(
      "usePricingDetail must be used within a PricingDetailProvider",
    );
  }
  return context;
};
