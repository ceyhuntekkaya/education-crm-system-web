"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CustomFeeListContextType } from "../types/custom-fee.types";
import { useCustomFeesByPricing } from "../hooks/useCustomFeesByPricing";

const CustomFeeListContext = createContext<
  CustomFeeListContextType | undefined
>(undefined);

interface CustomFeeListProviderProps {
  children: ReactNode;
}

export const CustomFeeListProvider: React.FC<CustomFeeListProviderProps> = ({
  children,
}) => {
  // Şimdilik pricingId=1 sabit olarak kullanıyoruz
  // TODO: Gerçek pricingId'yi context'ten veya props'tan al
  const pricingId = 1;

  // Custom fee hook'unu kullan
  const { customFees, customFeeLoading, customFeeError, refetchCustomFees } =
    useCustomFeesByPricing(pricingId);

  const contextValue: CustomFeeListContextType = {
    customFees,
    customFeeLoading,
    customFeeError,
    refetchCustomFees,
    pricingId,
  };

  return (
    <CustomFeeListContext.Provider value={contextValue}>
      {children}
    </CustomFeeListContext.Provider>
  );
};

export const useCustomFeeList = (): CustomFeeListContextType => {
  const context = useContext(CustomFeeListContext);
  if (context === undefined) {
    throw new Error(
      "useCustomFeeList must be used within a CustomFeeListProvider"
    );
  }
  return context;
};
