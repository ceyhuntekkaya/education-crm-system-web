"use client";

import React, { createContext, useContext } from "react";
import { useRFQActions } from "../../../../_shared/hooks/api";
import { useRFQsContext } from "../../../../_shared/contexts";
import { RFQDetailContextValue, RFQDetailProviderProps } from "../types";

const RFQDetailContext = createContext<RFQDetailContextValue | undefined>(
  undefined,
);

export const RFQDetailProvider: React.FC<RFQDetailProviderProps> = ({
  children,
  rfqId,
}) => {
  // RFQ verisini parent RFQsContext'ten al (duplicate API çağrısını önle)
  const { rfq, rfqLoading: isLoading } = useRFQsContext();
  const error = null; // Error handling parent context'te yapılıyor
  const refetch = () => {}; // Refetch parent context'te yapılıyor

  const {
    publishRFQ,
    closeRFQ,
    cancelRFQ,
    isPublishing,
    isClosing,
    isCancelling,
  } = useRFQActions(rfqId);

  const hasValidId = rfqId > 0;

  const contextValue: RFQDetailContextValue = {
    rfqId,
    rfq,
    isLoading,
    error,
    refetch,
    hasValidId,
    // RFQ Actions
    publishRFQ,
    closeRFQ,
    cancelRFQ,
    isPublishing,
    isClosing,
    isCancelling,
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
