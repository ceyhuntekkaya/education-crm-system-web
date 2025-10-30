"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { CustomFeeAddEditContextType } from "../types";
import { useCustomFeeById, useAddCustomFee, useEditCustomFee } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

const CustomFeeAddEditContext = createContext<
  CustomFeeAddEditContextType | undefined
>(undefined);

interface CustomFeeAddEditProviderProps {
  children: ReactNode;
}

export const CustomFeeAddEditProvider: React.FC<
  CustomFeeAddEditProviderProps
> = ({ children }) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const customFeeId = parseEditId(id);

  // Custom fee data hook
  const { customFee, customFeeLoading, customFeeError, refetchCustomFee } =
    useCustomFeeById(customFeeId);

  // Add custom fee hook
  const {
    postCustomFee,
    isLoading: addLoading,
    error: addError,
  } = useAddCustomFee();

  // Edit custom fee hook - refetch'i props olarak geçir
  const {
    putCustomFee,
    isLoading: editLoading,
    error: editError,
  } = useEditCustomFee({
    customFeeId: customFeeId || 0,
    refetch: isEditing ? refetchCustomFee : undefined,
  });

  const contextValue: CustomFeeAddEditContextType = {
    // Current custom fee data
    customFee,
    dataLoading: customFeeLoading, // Sadece data fetch loading'i
    customFeeError: customFeeError || addError || editError,

    // Form operations
    formLoading: addLoading || editLoading, // Sadece form submit loading'i

    // Edit mode state
    isEditing,
    customFeeId: customFeeId?.toString() || null,

    // Actions
    fetchCustomFee: refetchCustomFee,
    postCustomFee,
    putCustomFee,
  };

  return (
    <CustomFeeAddEditContext.Provider value={contextValue}>
      {children}
    </CustomFeeAddEditContext.Provider>
  );
};

export const useCustomFeeAddEdit = (): CustomFeeAddEditContextType => {
  const context = useContext(CustomFeeAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useCustomFeeAddEdit must be used within a CustomFeeAddEditProvider"
    );
  }
  return context;
};
