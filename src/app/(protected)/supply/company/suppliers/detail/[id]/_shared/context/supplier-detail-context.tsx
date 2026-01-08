"use client";

import React, { createContext, useContext } from "react";
import { useSupplierById } from "../hooks";
import {
  SupplierDetailContextValue,
  SupplierDetailProviderProps,
} from "../types";

const SupplierDetailContext = createContext<
  SupplierDetailContextValue | undefined
>(undefined);

export const SupplierDetailProvider: React.FC<SupplierDetailProviderProps> = ({
  children,
  supplierId,
}) => {
  const { data, loading, error, refetch } = useSupplierById(supplierId);

  const hasValidId = supplierId > 0;

  const contextValue: SupplierDetailContextValue = {
    supplierId,
    supplier: data?.data || null,
    isLoading: loading,
    error: error || null,
    refetch,
    hasValidId,
  };

  return (
    <SupplierDetailContext.Provider value={contextValue}>
      {children}
    </SupplierDetailContext.Provider>
  );
};

/**
 * SupplierDetail context'ini kullanmak için hook
 */
export const useSupplierDetail = (): SupplierDetailContextValue => {
  const context = useContext(SupplierDetailContext);
  if (context === undefined) {
    throw new Error(
      "useSupplierDetail must be used within a SupplierDetailProvider"
    );
  }
  return context;
};
