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

  // Edit pricing hook - sadece edit modunda kullan
  const {
    putPricing,
    isLoading: editLoading,
    error: editError,
  } = useEditPricing(pricingId || 0);

  const contextValue: PricingAddEditContextType = {
    // Current pricing data
    pricing,
    pricingLoading: pricingLoading || addLoading || editLoading,
    pricingError: pricingError || addError || editError,

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
