"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { RFQItemAddEditContextType } from "../types";
import {
  useItemById,
  useAddItem,
  useEditItem,
  useGetCategories,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { useRFQItemsContext } from "../../../_shared/contexts";

/**
 * RFQItemAddEditContext
 */
const RFQItemAddEditContext = createContext<
  RFQItemAddEditContextType | undefined
>(undefined);

interface RFQItemAddEditProviderProps {
  children: ReactNode;
}

export const RFQItemAddEditProvider: React.FC<RFQItemAddEditProviderProps> = ({
  children,
}) => {
  // RFQ Items context'ten rfqId'yi al
  const itemsContext = useRFQItemsContext();
  const rfqId = itemsContext?.rfqId || 0;

  const params = useParams();
  const { itemId } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(itemId);
  const parsedItemId = parseEditId(itemId);

  // Debug: ID parsing kontrolü
  console.log("🔍 RFQItemAddEditContext - itemId:", itemId);
  console.log("🔍 RFQItemAddEditContext - isEditing:", isEditing);
  console.log("🔍 RFQItemAddEditContext - parsedItemId:", parsedItemId);

  // Item data hook - Items listesinden itemId'ye göre bul
  const {
    item,
    isLoading: itemLoading,
    error: itemError,
    refetch,
  } = useItemById({
    itemId: parsedItemId,
  });

  // Debug: API response kontrolü
  console.log("📡 RFQItemAddEditContext - item:", item);
  console.log("⏳ RFQItemAddEditContext - itemLoading:", itemLoading);
  console.log("❌ RFQItemAddEditContext - itemError:", itemError);

  // Kategorileri tek seferde çek (context seviyesinde)
  const { data: categoriesResponse, loading: categoriesLoading } =
    useGetCategories();

  // Add Item hook
  const {
    postItem,
    isLoading: addLoading,
    error: addError,
  } = useAddItem({
    rfqId,
  });

  // Edit Item hook - refetch'i props olarak geçir
  const {
    putItem,
    isLoading: editLoading,
    error: editError,
  } = useEditItem({
    rfqId,
    itemId: parsedItemId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  const contextValue: RFQItemAddEditContextType = {
    // RFQ ID
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

    // Actions
    fetchItem: refetch,
    postItem,
    putItem,

    // Categories data
    categoriesResponse: categoriesResponse || null,
    categoriesLoading,
  };

  return (
    <RFQItemAddEditContext.Provider value={contextValue}>
      {children}
    </RFQItemAddEditContext.Provider>
  );
};

export const useRFQItemAddEdit = () => {
  const context = useContext(RFQItemAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useRFQItemAddEdit must be used within a RFQItemAddEditProvider"
    );
  }
  return context;
};
