"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { QuotationItemAddEditContextType } from "../types";
import { useItemById, useAddItem, useEditItem, useRfqItems } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { useQuotationItemsContext } from "../../../_shared/contexts";

/**
 * QuotationItemAddEditContext
 */
const QuotationItemAddEditContext = createContext<
  QuotationItemAddEditContextType | undefined
>(undefined);

interface QuotationItemAddEditProviderProps {
  children: ReactNode;
}

export const QuotationItemAddEditProvider: React.FC<
  QuotationItemAddEditProviderProps
> = ({ children }) => {
  // Quotation Items context'ten quotationId ve rfqId'yi al
  const itemsContext = useQuotationItemsContext();
  const quotationId = itemsContext?.quotationId || 0;
  const rfqId = itemsContext?.rfqId || null;

  const params = useParams();
  const { itemId } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(itemId);
  const parsedItemId = parseEditId(itemId);

  // RFQ Items hook - Quotation oluştururken RFQ itemlarını göstermek için
  const { rfqItems, loading: rfqItemsLoading } = useRfqItems({
    rfqId: rfqId || undefined,
    enabled: !!rfqId && !isEditing, // Sadece yeni item eklerken RFQ itemlarını çek
  });

  // Item data hook - Items listesinden itemId'ye göre bul
  const {
    item,
    isLoading: itemLoading,
    error: itemError,
    refetch,
  } = useItemById({
    itemId: parsedItemId,
  });

  // Add Item hook
  const {
    postItem,
    isLoading: addLoading,
    error: addError,
  } = useAddItem({
    quotationId,
  });

  // Edit Item hook - refetch'i props olarak geçir
  const {
    putItem,
    isLoading: editLoading,
    error: editError,
  } = useEditItem({
    quotationId,
    itemId: parsedItemId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  const contextValue: QuotationItemAddEditContextType = {
    // Quotation ID
    quotationId,
    rfqId,

    // Current item data
    item: item || null,
    itemDetailLoading: itemLoading, // Sadece veri çekerken
    itemSubmitLoading: addLoading || editLoading, // Form submit edilirken
    itemError:
      itemError?.toString() ||
      addError?.toString() ||
      editError?.toString() ||
      null,

    // Edit mode state
    isEditing,
    itemId: parsedItemId?.toString() || null,

    // RFQ Items data
    rfqItems: rfqItems || [],
    rfqItemsLoading,

    // Actions
    fetchItem: refetch,
    postItem,
    putItem,
  };

  return (
    <QuotationItemAddEditContext.Provider value={contextValue}>
      {children}
    </QuotationItemAddEditContext.Provider>
  );
};

export const useQuotationItemAddEdit = () => {
  const context = useContext(QuotationItemAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useQuotationItemAddEdit must be used within a QuotationItemAddEditProvider",
    );
  }
  return context;
};
