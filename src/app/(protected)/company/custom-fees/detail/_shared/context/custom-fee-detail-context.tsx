"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useParams } from "next/navigation";
import { CustomFeeDto } from "@/types";
import { useCustomFeeById as useCustomFeeByIdHook } from "../hooks/use-custom-fee-by-id";
import { createCustomFeeSections } from "../utils/config-processor";
import { CUSTOM_FEE_SECTIONS } from "../config/section-definitions";
import {
  CustomFeeDetailContextType,
  CustomFeeDetailProviderProps,
} from "../types/custom-fee-detail.types";

const CustomFeeDetailContext = createContext<
  CustomFeeDetailContextType | undefined
>(undefined);

export const CustomFeeDetailProvider: React.FC<
  CustomFeeDetailProviderProps
> = ({ children }) => {
  const params = useParams();
  const customFeeId = params?.id ? Number(params.id) : null;

  // Use the custom fee detail hook with ID from URL
  const {
    customFee: customFeeDetail,
    loading: customFeeLoading,
    error: customFeeError,
    refetch: refetchCustomFee,
  } = useCustomFeeByIdHook({
    customFeeId: customFeeId,
  });

  // Process all sections using config
  const allSections = useMemo(() => {
    return createCustomFeeSections(CUSTOM_FEE_SECTIONS, customFeeDetail);
  }, [customFeeDetail]);

  const contextValue: CustomFeeDetailContextType = {
    currentCustomFee: customFeeDetail,
    isLoading: customFeeId ? customFeeLoading : false,
    error: customFeeError,
    refreshCustomFee: refetchCustomFee,
    allSections,
  };

  return (
    <CustomFeeDetailContext.Provider value={contextValue}>
      {children}
    </CustomFeeDetailContext.Provider>
  );
};

export const useCustomFeeDetail = (): CustomFeeDetailContextType => {
  const context = useContext(CustomFeeDetailContext);
  if (context === undefined) {
    throw new Error(
      "useCustomFeeDetail must be used within a CustomFeeDetailProvider"
    );
  }
  return context;
};
