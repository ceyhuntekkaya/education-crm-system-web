"use client";

import React, { createContext, useContext } from "react";
import {
  useSubmitQuotation,
  useAcceptQuotation,
  useRejectQuotation,
} from "../hooks/api";
import {
  QuotationDetailContextValue,
  QuotationDetailProviderProps,
} from "../types";
import { useQuotationsContext } from "../../../../_shared";

const QuotationDetailContext = createContext<
  QuotationDetailContextValue | undefined
>(undefined);

export const QuotationDetailProvider: React.FC<
  QuotationDetailProviderProps
> = ({ children, quotationId }) => {
  // Üst seviye context'ten quotation verisini al (tekrar API çağrısı yapmamak için)
  const {
    quotation,
    quotationLoading: isLoading,
    quotationError: error,
    refetchQuotation: refetch,
  } = useQuotationsContext();

  const { submitQuotation, isSubmitting } = useSubmitQuotation(quotationId);
  const { acceptQuotation, isAccepting } = useAcceptQuotation(quotationId);
  const { rejectQuotation, isRejecting } = useRejectQuotation(quotationId);

  const hasValidId = quotationId > 0;

  const contextValue: QuotationDetailContextValue = {
    quotation,
    isLoading,
    error,
    hasValidId,
    refetch,
    submitQuotation,
    acceptQuotation,
    rejectQuotation,
    isSubmitting,
    isAccepting,
    isRejecting,
  };

  return (
    <QuotationDetailContext.Provider value={contextValue}>
      {children}
    </QuotationDetailContext.Provider>
  );
};

export const useQuotationDetail = () => {
  const context = useContext(QuotationDetailContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationDetail must be used within a QuotationDetailProvider",
    );
  }
  return context;
};

export default QuotationDetailContext;
