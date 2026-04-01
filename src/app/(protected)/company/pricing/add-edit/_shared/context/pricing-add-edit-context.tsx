"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { PricingAddEditContextType } from "../types";
import { useAddPricing, useEditPricing } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { usePricing } from "../../../_shared";

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
  const { schoolPricings, pricingLoading, pricingError, refetchPricings } =
    usePricing();

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const pricingId = parseEditId(id);

  // PricingContext zaten aynı school ID ile veri çekiyor, tekrar istek atmaya gerek yok
  const pricing = schoolPricings?.[0] ?? null;

  // Add pricing hook
  const {
    postPricing,
    isLoading: addLoading,
    error: addError,
  } = useAddPricing();

  // Edit pricing hook
  const {
    putPricing,
    isLoading: editLoading,
    error: editError,
  } = useEditPricing({
    pricingId: pricingId || 0,
    refetch: isEditing ? refetchPricings : undefined,
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
    fetchPricing: refetchPricings,
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
      "usePricingAddEdit must be used within a PricingAddEditProvider",
    );
  }
  return context;
};
