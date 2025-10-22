"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useParams } from "next/navigation";
import { useCompany } from "@/app/(protected)/company/_shared";
import { BrandDto } from "@/types";
import { useBrandDetail as useBrandDetailHook } from "../hooks/use-brand-detail";
import { createBrandSections } from "../utils/config-processor";
import { BRAND_SECTIONS } from "../config/section-definitions";
import {
  BrandDetailContextType,
  BrandDetailProviderProps,
} from "../types/brand-detail.types";

const BrandDetailContext = createContext<BrandDetailContextType | undefined>(
  undefined
);

export const BrandDetailProvider: React.FC<BrandDetailProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const brandId = params?.id ? Number(params.id) : null;

  const { selectedSchool, schools, isInitialized } = useCompany();

  // Use the brand detail hook with ID from URL
  const {
    brand: brandDetail,
    loading: brandLoading,
    error: brandError,
    refetch: refetchBrand,
  } = useBrandDetailHook({
    brandId: brandId,
  });

  // Process all sections using config
  const allSections = useMemo(() => {
    return createBrandSections(BRAND_SECTIONS, brandDetail);
  }, [brandDetail]);

  const contextValue: BrandDetailContextType = {
    currentBrand: brandDetail,
    isLoading: !isInitialized || (brandId ? brandLoading : false),
    error: brandError,
    refreshBrand: refetchBrand,
    selectedSchool,
    schools,
    allSections,
  };

  return (
    <BrandDetailContext.Provider value={contextValue}>
      {children}
    </BrandDetailContext.Provider>
  );
};

export const useBrandDetail = (): BrandDetailContextType => {
  const context = useContext(BrandDetailContext);
  if (context === undefined) {
    throw new Error("useBrandDetail must be used within a BrandDetailProvider");
  }
  return context;
};
