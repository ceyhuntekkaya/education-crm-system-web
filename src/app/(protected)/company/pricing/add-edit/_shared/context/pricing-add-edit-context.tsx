"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { PricingAddEditContextType } from "../types";
import { usePricingById, useAddPricing, useEditPricing } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

const PricingAddEditContext = createContext<
  PricingAddEditContextType | undefined
>(undefined);

interface PricingAddEditProviderProps {
  children: ReactNode;
}

export const PricingAddEditProvider: React.FC<PricingAddEditProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const pricingId = parseEditId(id);

  // Pricing data hook
  const {
    pricing,
    isLoading: pricingLoading,
    error: pricingError,
    refetch,
  } = usePricingById(pricingId);

  // Add pricing hook
  const {
    postPricing,
    isLoading: addLoading,
    error: addError,
  } = useAddPricing();

  // Edit pricing hook - refetch'i props olarak geçir
  const {
    putPricing,
    isLoading: editLoading,
    error: editError,
  } = useEditPricing({
    pricingId: pricingId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  const contextValue: PricingAddEditContextType = {
    // Current pricing data
    pricing,
    dataLoading: pricingLoading, // Sadece data fetch loading'i
    pricingError: pricingError || addError || editError,

    // Form operations
    formLoading: addLoading || editLoading, // Sadece form submit loading'i

    // Edit mode state
    isEditing,
    pricingId: pricingId?.toString() || null,

    // Actions
    fetchPricing: refetch,
    postPricing,
    putPricing,
  };

  return (
    <PricingAddEditContext.Provider value={contextValue}>
      {children}
    </PricingAddEditContext.Provider>
  );
};

export const usePricingAddEdit = (): PricingAddEditContextType => {
  const context = useContext(PricingAddEditContext);
  if (context === undefined) {
    throw new Error(
      "usePricingAddEdit must be used within a PricingAddEditProvider"
    );
  }
  return context;
};
