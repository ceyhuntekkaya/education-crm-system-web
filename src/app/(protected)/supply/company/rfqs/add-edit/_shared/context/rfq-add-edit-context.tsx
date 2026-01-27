"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";
import { useParams } from "next/navigation";
import { RFQAddEditContextType } from "../types";
import { useRFQById, useAddRFQ, useEditRFQ } from "../hooks";
import { useAddRFQItemForAddEdit } from "../hooks/use-add-rfq-item";
import { isValidEditId, parseEditId } from "../utils";
import { useRFQsContext } from "../../../_shared/contexts";
import { useGetCategories } from "../../../items/[id]/add-edit/_shared/hooks";

/**
 * RFQAddEditContext
 */
const RFQAddEditContext = createContext<RFQAddEditContextType | undefined>(
  undefined,
);

interface RFQAddEditProviderProps {
  children: ReactNode;
}

export const RFQAddEditProvider: React.FC<RFQAddEditProviderProps> = ({
  children,
}) => {
  // Company ID - TODO: Get from auth context
  const companyId = 1;
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const rfqId = parseEditId(id);

  // Selected category ID state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  // RFQ data hook
  const {
    rfq,
    isLoading: rfqLoading,
    error: rfqError,
    refetch,
  } = useRFQById(rfqId ?? 0);

  // Add RFQ hook
  const { postRFQ, isLoading: addLoading, error: addError } = useAddRFQ();

  // Edit RFQ hook - refetch'i props olarak geçir
  const {
    putRFQ,
    isLoading: editLoading,
    error: editError,
  } = useEditRFQ({
    rfqId: rfqId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Add RFQ Item hook
  const {
    postRFQItem,
    isLoading: addItemLoading,
    error: addItemError,
  } = useAddRFQItemForAddEdit();

  // RFQs Context'ten suppliers verilerini al
  const { suppliersData, suppliersLoading } = useRFQsContext();

  // Categories hook
  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategories();

  const contextValue: RFQAddEditContextType = {
    // Company ID
    companyId,

    // Current RFQ data
    rfq: rfq || null,
    rfqDetailLoading: rfqLoading, // Sadece veri çekerken
    rfqSubmitLoading: addLoading || editLoading, // Form submit edilirken
    rfqError:
      rfqError?.toString() ||
      addError?.toString() ||
      editError?.toString() ||
      null,

    // Edit mode state
    isEditing,
    rfqId: rfqId?.toString() || null,

    // Actions
    fetchRFQ: refetch,
    postRFQ,
    putRFQ,

    // RFQ Item Actions
    postRFQItem,
    rfqItemSubmitLoading: addItemLoading,
    rfqItemSubmitError: addItemError || null,

    // Selected category ID
    selectedCategoryId,
    setSelectedCategoryId,

    // Categories data
    categoriesData,
    categoriesLoading,

    // Suppliers data
    suppliersData,
    suppliersLoading,
  };

  return (
    <RFQAddEditContext.Provider value={contextValue}>
      {children}
    </RFQAddEditContext.Provider>
  );
};

export const useRFQAddEdit = () => {
  const context = useContext(RFQAddEditContext);
  if (context === undefined) {
    throw new Error("useRFQAddEdit must be used within a RFQAddEditProvider");
  }
  return context;
};
