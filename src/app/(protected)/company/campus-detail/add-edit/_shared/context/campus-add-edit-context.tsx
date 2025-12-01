"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { CampusAddEditContextType } from "../types";
import {
  useCampusById,
  useAddCampus,
  useEditCampus,
  useBrandSummaries,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { useCampusDetail } from "../../../_shared/context/campus-detail-context";

const CampusAddEditContext = createContext<
  CampusAddEditContextType | undefined
>(undefined);

interface CampusAddEditProviderProps {
  children: ReactNode;
}

export const CampusAddEditProvider: React.FC<CampusAddEditProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const campusId = parseEditId(id);

  // Campus detail context'ten refetch fonksiyonunu al (detay sayfası için)
  const { refreshCampus: refreshCampusDetail } = useCampusDetail();

  // Campus data hook
  const {
    campus,
    isLoading: campusLoading,
    error: campusError,
    refetch,
  } = useCampusById(campusId);

  // Add campus hook
  const { postCampus, isLoading: addLoading, error: addError } = useAddCampus();

  // Birleşik refetch fonksiyonu - hem add-edit'teki veriyi hem de detay sayfasındaki veriyi yeniler
  const combinedRefetch = () => {
    refetch();
    refreshCampusDetail();
  };

  // Edit campus hook - combinedRefetch'i props olarak geçir
  const {
    putCampus,
    isLoading: editLoading,
    error: editError,
  } = useEditCampus({
    campusId: campusId || 0,
    refetch: isEditing ? combinedRefetch : undefined,
  });

  // Brand summaries hook
  const { brands } = useBrandSummaries();

  const contextValue: CampusAddEditContextType = {
    // Current campus data
    campus,
    dataLoading: campusLoading, // Sadece data fetch loading'i
    campusError: campusError || addError || editError,

    // Form operations
    formLoading: addLoading || editLoading, // Sadece form submit loading'i

    // Edit mode state
    isEditing,
    campusId: campusId?.toString() || null,

    // Brand summaries
    brands,

    // Actions
    fetchCampus: refetch,
    postCampus,
    putCampus,
  };

  return (
    <CampusAddEditContext.Provider value={contextValue}>
      {children}
    </CampusAddEditContext.Provider>
  );
};

export const useCampusAddEdit = (): CampusAddEditContextType => {
  const context = useContext(CampusAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useCampusAddEdit must be used within a CampusAddEditProvider"
    );
  }
  return context;
};
