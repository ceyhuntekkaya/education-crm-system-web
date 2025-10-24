"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { BrandAddEditContextType } from "../types";
import { useBrandById, useAddBrand, useEditBrand } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

const BrandAddEditContext = createContext<BrandAddEditContextType | undefined>(
  undefined
);

interface BrandAddEditProviderProps {
  children: ReactNode;
}

export const BrandAddEditProvider: React.FC<BrandAddEditProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const brandId = parseEditId(id);

  // Brand data hook
  const {
    brand,
    isLoading: brandLoading,
    error: brandError,
    refetch,
  } = useBrandById(brandId);

  // Add brand hook
  const { postBrand, isLoading: addLoading, error: addError } = useAddBrand();

  // Edit brand hook - refetch'i props olarak geçir
  const {
    putBrand,
    isLoading: editLoading,
    error: editError,
  } = useEditBrand({
    brandId: brandId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  const contextValue: BrandAddEditContextType = {
    // Current brand data
    brand,
    brandLoading: brandLoading || addLoading || editLoading,
    brandError: brandError || addError || editError,

    // Edit mode state
    isEditing,
    brandId: brandId?.toString() || null,

    // Actions
    fetchBrand: refetch,
    postBrand,
    putBrand,
  };

  return (
    <BrandAddEditContext.Provider value={contextValue}>
      {children}
    </BrandAddEditContext.Provider>
  );
};

export const useBrandAddEdit = (): BrandAddEditContextType => {
  const context = useContext(BrandAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useBrandAddEdit must be used within a BrandAddEditProvider"
    );
  }
  return context;
};
