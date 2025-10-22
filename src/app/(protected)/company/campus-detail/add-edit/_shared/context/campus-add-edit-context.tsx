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

  // Campus data hook
  const {
    campus,
    isLoading: campusLoading,
    error: campusError,
    refetch,
  } = useCampusById(campusId);

  // Add campus hook
  const { postCampus, isLoading: addLoading, error: addError } = useAddCampus();

  // Edit campus hook - sadece edit modunda kullan
  const {
    putCampus,
    isLoading: editLoading,
    error: editError,
  } = useEditCampus(campusId || 0);

  // Brand summaries hook
  const { brands } = useBrandSummaries();

  const contextValue: CampusAddEditContextType = {
    // Current campus data
    campus,
    campusLoading: campusLoading || addLoading || editLoading,
    campusError: campusError || addError || editError,

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
