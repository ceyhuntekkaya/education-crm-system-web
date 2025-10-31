"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useCompany } from "@/app/(protected)/company/_shared";
import { SchoolDto } from "@/types";
import { useSchoolDetail as useSchoolDetailHook } from "../hooks/use-school-detail";
import { useSchoolProperty } from "../hooks/use-school-property";
import { GroupedSchoolProperty } from "../types";

// Local type definition to avoid circular dependency
export interface SchoolDetailContextType {
  currentSchool: SchoolDto | null;
  isLoading: boolean;
  error: string | null;
  refreshSchool: () => void;
  // Company context'ten gelen değerler
  selectedSchool: { id: number; name: string } | null;
  schools: { id: number; name: string }[];
  // School properties
  schoolProperties: GroupedSchoolProperty[];
  isPropertiesLoading: boolean;
  propertiesError: string | null;
  refreshProperties: () => void;
}

const SchoolDetailContext = createContext<SchoolDetailContextType | undefined>(
  undefined
);

interface SchoolDetailProviderProps {
  children: ReactNode;
}

export const SchoolDetailProvider: React.FC<SchoolDetailProviderProps> = ({
  children,
}) => {
  const { selectedSchool, schools, isInitialized } = useCompany();

  // Use the school detail hook only when we have a selected school
  const {
    school: schoolDetail,
    loading: schoolLoading,
    error: schoolError,
    refetch: refetchSchool,
  } = useSchoolDetailHook({
    schoolId: selectedSchool?.id || 0,
  });

  // Use the school property hook
  const {
    groupedProperties,
    loading: propertiesLoading,
    error: propertiesError,
    refetch: refetchProperties,
  } = useSchoolProperty({
    schoolId: selectedSchool?.id || null,
  });

  const contextValue: SchoolDetailContextType = {
    currentSchool: schoolDetail,
    isLoading: !isInitialized || (selectedSchool ? schoolLoading : false),
    error: schoolError,
    refreshSchool: refetchSchool,
    selectedSchool,
    schools,
    schoolProperties: groupedProperties,
    isPropertiesLoading: propertiesLoading,
    propertiesError,
    refreshProperties: refetchProperties,
  };

  return (
    <SchoolDetailContext.Provider value={contextValue}>
      {children}
    </SchoolDetailContext.Provider>
  );
};

export const useSchoolDetail = (): SchoolDetailContextType => {
  const context = useContext(SchoolDetailContext);
  if (context === undefined) {
    throw new Error(
      "useSchoolDetail must be used within a SchoolDetailProvider"
    );
  }
  return context;
};
