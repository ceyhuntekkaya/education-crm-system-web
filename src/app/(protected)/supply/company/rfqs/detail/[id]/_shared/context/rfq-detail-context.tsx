"use client";

import React, { createContext, useContext } from "react";
import { useRFQById } from "../../../../_shared/hooks/api";
import { RFQDetailContextValue, RFQDetailProviderProps } from "../types";

const RFQDetailContext = createContext<RFQDetailContextValue | undefined>(
  undefined
);

export const RFQDetailProvider: React.FC<RFQDetailProviderProps> = ({
  children,
  rfqId,
}) => {
  const { rfq, isLoading, error, refetch } = useRFQById(rfqId);

  const hasValidId = rfqId > 0;

  const contextValue: RFQDetailContextValue = {
    rfqId,
    rfq,
    isLoading,
    error,
    refetch,
    hasValidId,
  };

  return (
    <RFQDetailContext.Provider value={contextValue}>
      {children}
    </RFQDetailContext.Provider>
  );
};

/**
 * RFQDetail context'ini kullanmak için hook
 */
export const useRFQDetail = (): RFQDetailContextValue => {
  const context = useContext(RFQDetailContext);
  if (context === undefined) {
    throw new Error("useRFQDetail must be used within a RFQDetailProvider");
  }
  return context;
};
