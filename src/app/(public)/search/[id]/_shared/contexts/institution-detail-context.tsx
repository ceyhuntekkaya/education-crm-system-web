"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { formatCurrency, renderStars } from "../utils";
import { useInstitutionDetailHook, useInstitutionPricingHook } from "../hooks";

// Context State Interface
interface InstitutionDetailState {
  institutionDetail: any;
  school: any;
  campus: any;
  brand: any;
  pricings: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  // Utility functions
  renderStars: typeof renderStars;
  formatCurrency: typeof formatCurrency;
}

// Context Props Interface
interface InstitutionDetailContextProps {
  id: string;
  children: ReactNode;
}

// Create Context
const InstitutionDetailContext = createContext<
  InstitutionDetailState | undefined
>(undefined);

// Provider Component
export function InstitutionDetailProvider({
  id,
  children,
}: InstitutionDetailContextProps) {
  // Institution detail hook'unu kullan
  const {
    institutionDetail,
    loading: institutionLoading,
    error: institutionError,
    refetch: refetchInstitution,
  } = useInstitutionDetailHook({ id });

  // Pricing hook'unu kullan
  const {
    pricings: pricingData,
    loading: pricingLoading,
    error: pricingError,
    refetch: refetchPricing,
  } = useInstitutionPricingHook({ schoolId: id });

  // school = tüm institution detail datası
  // campus, brand, pricings = nested objeler
  const school = institutionDetail;
  const campus = institutionDetail?.campus || null;
  const brand = institutionDetail?.brand || null;

  const contextValue: InstitutionDetailState = {
    institutionDetail,
    school: school,
    campus: campus,
    brand: brand,
    pricings: pricingData || [],
    loading: institutionLoading || pricingLoading,
    error: institutionError || pricingError,
    refetch: () => {
      refetchInstitution();
      refetchPricing();
    },
    renderStars,
    formatCurrency,
  };

  return (
    <InstitutionDetailContext.Provider value={contextValue}>
      {children}
    </InstitutionDetailContext.Provider>
  );
}

// Custom Hook to use Context
export function useInstitutionDetail(): InstitutionDetailState {
  const context = useContext(InstitutionDetailContext);

  if (context === undefined) {
    throw new Error(
      "useInstitutionDetail must be used within an InstitutionDetailProvider"
    );
  }

  return context;
}

export default InstitutionDetailContext;
