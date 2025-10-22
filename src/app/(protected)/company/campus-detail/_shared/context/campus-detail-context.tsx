"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useCompany } from "@/app/(protected)/company/_shared";
import { CampusDto } from "@/types";
import { useCampusDetail as useCampusDetailHook } from "../hooks/use-campus-detail";
import { createCampusSections } from "../utils";
import { CAMPUS_SECTIONS } from "../config";
import { CampusDetailContextType, CampusDetailProviderProps } from "../types";

const CampusDetailContext = createContext<CampusDetailContextType | undefined>(
  undefined
);

export const CampusDetailProvider: React.FC<CampusDetailProviderProps> = ({
  children,
}) => {
  const { selectedSchool, schools, isInitialized } = useCompany();

  // Use the campus detail hook only when we have a selected school
  // Campus ID'yi selectedSchool'dan alıyoruz (campus her zaman school ile ilişkili)
  const {
    campus: campusDetail,
    loading: campusLoading,
    error: campusError,
    refetch: refetchCampus,
  } = useCampusDetailHook({
    campusId: 1,
  });

  // Process all sections using config
  const allSections = useMemo(() => {
    return createCampusSections(CAMPUS_SECTIONS, campusDetail);
  }, [campusDetail]);

  const contextValue: CampusDetailContextType = {
    currentCampus: campusDetail,
    isLoading: !isInitialized || (selectedSchool ? campusLoading : false),
    error: campusError,
    refreshCampus: refetchCampus,
    selectedSchool,
    schools,
    allSections,
  };

  return (
    <CampusDetailContext.Provider value={contextValue}>
      {children}
    </CampusDetailContext.Provider>
  );
};

export const useCampusDetail = (): CampusDetailContextType => {
  const context = useContext(CampusDetailContext);
  if (context === undefined) {
    throw new Error(
      "useCampusDetail must be used within a CampusDetailProvider"
    );
  }
  return context;
};
