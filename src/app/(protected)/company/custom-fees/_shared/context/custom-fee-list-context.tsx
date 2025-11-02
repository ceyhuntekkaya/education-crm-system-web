"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CustomFeeListContextType } from "../types/custom-fee.types";
import { useCustomFeesByPricing } from "../hooks/useCustomFeesByPricing";
import { useCompany } from "@/app/(protected)/company/_shared";

const CustomFeeListContext = createContext<
  CustomFeeListContextType | undefined
>(undefined);

interface CustomFeeListProviderProps {
  children: ReactNode;
}

export const CustomFeeListProvider: React.FC<CustomFeeListProviderProps> = ({
  children,
}) => {
  // useCompany'den selectedSchool'u al
  const { selectedSchool } = useCompany();
  const schoolId = selectedSchool?.id || null;

  // Custom fee hook'unu kullan
  const { customFees, customFeeLoading, customFeeError, refetchCustomFees } =
    useCustomFeesByPricing(schoolId);

  const contextValue: CustomFeeListContextType = {
    customFees,
    customFeeLoading,
    customFeeError,
    refetchCustomFees,
    pricingId: schoolId, // Geriye uyumluluk için pricingId yerine schoolId kullanıyoruz
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
