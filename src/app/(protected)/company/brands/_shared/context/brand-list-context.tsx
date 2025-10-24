"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { BrandListContextType } from "../types/brand.types";
import { useBrands } from "../hooks/use-brands";

const BrandListContext = createContext<BrandListContextType | undefined>(
  undefined
);

interface BrandListProviderProps {
  children: ReactNode;
}

export const BrandListProvider: React.FC<BrandListProviderProps> = ({
  children,
}) => {
  // Brand hook'unu kullan
  const { brands, brandLoading, brandError, refetchBrands } = useBrands();

  const contextValue: BrandListContextType = {
    brands,
    brandLoading,
    brandError,
    refetchBrands,
  };

  return (
    <BrandListContext.Provider value={contextValue}>
      {children}
    </BrandListContext.Provider>
  );
};

export const useBrandList = (): BrandListContextType => {
  const context = useContext(BrandListContext);
  if (context === undefined) {
    throw new Error("useBrandList must be used within a BrandListProvider");
  }
  return context;
};
