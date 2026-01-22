"use client";

import React, { createContext, useContext } from "react";
import {
  useQuotationById,
  useSubmitQuotation,
  useAcceptQuotation,
  useRejectQuotation,
} from "../hooks/api";
import {
  QuotationDetailContextValue,
  QuotationDetailProviderProps,
} from "../types";

const QuotationDetailContext = createContext<
  QuotationDetailContextValue | undefined
>(undefined);

export const QuotationDetailProvider: React.FC<
  QuotationDetailProviderProps
> = ({ children, quotationId }) => {
  const { quotation, isLoading, error, refetch } =
    useQuotationById(quotationId);

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
