"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { RFQAddEditContextType } from "../types";
import { useRFQById, useAddRFQ, useEditRFQ } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { useRFQsContext } from "../../../_shared/contexts";

/**
 * RFQAddEditContext
 */
const RFQAddEditContext = createContext<RFQAddEditContextType | undefined>(
  undefined
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

  // Debug: ID parsing kontrolü
  console.log("🔍 RFQAddEditContext - id:", id);
  console.log("🔍 RFQAddEditContext - isEditing:", isEditing);
  console.log("🔍 RFQAddEditContext - rfqId:", rfqId);

  // RFQ data hook
  const {
    rfq,
    isLoading: rfqLoading,
    error: rfqError,
    refetch,
  } = useRFQById(rfqId);

  // Debug: API response kontrolü
  console.log("📡 RFQAddEditContext - rfq:", rfq);
  console.log("⏳ RFQAddEditContext - rfqLoading:", rfqLoading);
  console.log("❌ RFQAddEditContext - rfqError:", rfqError);

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
