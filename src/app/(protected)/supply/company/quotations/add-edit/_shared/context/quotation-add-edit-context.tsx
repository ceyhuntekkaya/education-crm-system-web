"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { QuotationAddEditContextType } from "../types";
import {
  useQuotationById,
  useAddQuotation,
  useEditQuotation,
  useQuotationOptions,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

/**
 * QuotationAddEditContext
 * Social media PostAddEditContext yapısı ile aynı mimari
 */
const QuotationAddEditContext = createContext<
  QuotationAddEditContextType | undefined
>(undefined);

interface QuotationAddEditProviderProps {
  children: ReactNode;
}

export const QuotationAddEditProvider: React.FC<
  QuotationAddEditProviderProps
> = ({ children }) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const quotationId = parseEditId(id);

  // Debug: ID parsing kontrolü
  console.log("🔍 QuotationAddEditContext - id:", id);
  console.log("🔍 QuotationAddEditContext - isEditing:", isEditing);
  console.log("🔍 QuotationAddEditContext - quotationId:", quotationId);

  // Quotation data hook
  const {
    quotation,
    isLoading: quotationLoading,
    error: quotationError,
    refetch,
  } = useQuotationById(quotationId);

  // Debug: API response kontrolü
  console.log("📡 QuotationAddEditContext - quotation:", quotation);
  console.log(
    "⏳ QuotationAddEditContext - quotationLoading:",
    quotationLoading
  );
  console.log("❌ QuotationAddEditContext - quotationError:", quotationError);

  // Add quotation hook
  const {
    postQuotation,
    isLoading: addLoading,
    error: addError,
  } = useAddQuotation();

  // Edit quotation hook - refetch'i props olarak geçir
  const {
    putQuotation,
    isLoading: editLoading,
    error: editError,
  } = useEditQuotation({
    quotationId: quotationId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Quotation options hook
  const { currencyOptions } = useQuotationOptions();

  const contextValue: QuotationAddEditContextType = {
    // Current quotation data
    quotation,
    quotationDetailLoading: quotationLoading, // Sadece veri çekerken
    quotationSubmitLoading: addLoading || editLoading, // Form submit edilirken
    quotationError:
      quotationError?.toString() ||
      addError?.toString() ||
      editError?.toString() ||
      null,

    // Edit mode state
    isEditing,
    quotationId: quotationId?.toString() || null,

    // Form options
    currencyOptions,

    // Actions
    fetchQuotation: refetch,
    postQuotation,
    putQuotation,
  };

  return (
    <QuotationAddEditContext.Provider value={contextValue}>
      {children}
    </QuotationAddEditContext.Provider>
  );
};

export const useQuotationAddEdit = (): QuotationAddEditContextType => {
  const context = useContext(QuotationAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationAddEdit must be used within a QuotationAddEditProvider"
    );
  }
  return context;
};
