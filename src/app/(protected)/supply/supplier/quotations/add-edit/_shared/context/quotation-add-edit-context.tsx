"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { QuotationAddEditContextType } from "../types";
import { useQuotationById, useAddQuotation, useEditQuotation } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { useQuotationsContext } from "../../../_shared/contexts";

/**
 * QuotationAddEditContext
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
  // Supplier ID - TODO: Get from auth context
  const supplierId = 1;

  const params = useParams();
  const searchParams = useSearchParams();
  const { id } = params;

  // RFQ ID'yi query string'den al (yeni quotation oluştururken)
  const rfqIdParam = searchParams?.get("rfqId");
  const rfqId = rfqIdParam ? parseInt(rfqIdParam, 10) : null;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const quotationId = parseEditId(id);

  // Debug: ID parsing kontrolü
  console.log("🔍 QuotationAddEditContext - id:", id);
  console.log("🔍 QuotationAddEditContext - isEditing:", isEditing);
  console.log("🔍 QuotationAddEditContext - quotationId:", quotationId);
  console.log("🔍 QuotationAddEditContext - rfqId:", rfqId);

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
    quotationLoading,
  );
  console.log("❌ QuotationAddEditContext - quotationError:", quotationError);

  // Add Quotation hook
  const {
    postQuotation,
    isLoading: addLoading,
    error: addError,
  } = useAddQuotation();

  // Edit Quotation hook - refetch'i props olarak geçir
  const {
    putQuotation,
    isLoading: editLoading,
    error: editError,
  } = useEditQuotation({
    quotationId: quotationId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  const contextValue: QuotationAddEditContextType = {
    // RFQ ID
    rfqId,

    // Supplier ID
    supplierId,

    // Current Quotation data
    quotation: quotation || null,
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

export const useQuotationAddEdit = () => {
  const context = useContext(QuotationAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationAddEdit must be used within a QuotationAddEditProvider",
    );
  }
  return context;
};
