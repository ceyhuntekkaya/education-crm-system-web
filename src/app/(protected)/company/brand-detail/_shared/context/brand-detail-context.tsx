"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useCompany } from "@/app/(protected)/company/_shared";
import { BrandDto } from "@/types";
import { useBrandDetail as useBrandDetailHook } from "../hooks/use-brand-detail";
import { createBrandSections } from "../utils";
import { BRAND_SECTIONS } from "../config";
import { BrandDetailContextType, BrandDetailProviderProps } from "../types";

const BrandDetailContext = createContext<BrandDetailContextType | undefined>(
  undefined
);

export const BrandDetailProvider: React.FC<BrandDetailProviderProps> = ({
  children,
}) => {
  const { selectedSchool, schools, isInitialized } = useCompany();

  // Use the brand detail hook only when we have a selected school
  // Brand ID'yi selectedSchool'dan alıyoruz (brand her zaman school ile ilişkili)
  const {
    brand: brandDetail,
    loading: brandLoading,
    error: brandError,
    refetch: refetchBrand,
  } = useBrandDetailHook({
    brandId: 1,
  });

  // Process all sections using config
  const allSections = useMemo(() => {
    return createBrandSections(BRAND_SECTIONS, brandDetail);
  }, [brandDetail]);

  const contextValue: BrandDetailContextType = {
    currentBrand: brandDetail,
    isLoading: !isInitialized || (selectedSchool ? brandLoading : false),
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
