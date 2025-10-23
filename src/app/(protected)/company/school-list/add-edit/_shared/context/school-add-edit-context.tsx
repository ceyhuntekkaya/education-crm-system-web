"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts";
import { SchoolAddEditContextType } from "../types";
import { SchoolCreateDto, SchoolDto } from "@/types";
import {
  useSchoolById,
  useAddSchool,
  useEditSchool,
  useInstitutionTypes,
  useCampusesByBrand,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

const SchoolAddEditContext = createContext<
  SchoolAddEditContextType | undefined
>(undefined);

interface SchoolAddEditProviderProps {
  children: ReactNode;
}

export const SchoolAddEditProvider: React.FC<SchoolAddEditProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const { id } = params;

  // Auth context'ten brand ID'yi al
  const { user } = useAuth();

  // User'ın institutionAccess'inden brand ID'yi al (BRAND tipindeki access)
  const brandAccess = user?.institutionAccess?.find(
    (access) => access.accessType === "BRAND"
  );
  const brandId = brandAccess?.entityId || null;

  console.log("user :>> ", user);

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const schoolId = parseEditId(id);

  // School data hook
  const {
    school,
    isLoading: schoolLoading,
    error: schoolError,
    refetch,
  } = useSchoolById(schoolId);

  // Add school hook
  const { postSchool, isLoading: addLoading, error: addError } = useAddSchool();

  // Edit school hook - sadece edit modunda kullan
  const {
    putSchool,
    isLoading: editLoading,
    error: editError,
  } = useEditSchool(schoolId || 0, refetch);

  // Institution types ve options'ları getir
  const {
    institutionTypeOptions,
    isLoading: institutionTypesLoading,
    error: institutionTypesError,
  } = useInstitutionTypes();

  // Campuses ve options'ları getir
  const {
    campusOptions,
    isLoading: campusesLoading,
    error: campusesError,
  } = useCampusesByBrand(brandId);

  console.log("school ::>> ", school);

  const contextValue: SchoolAddEditContextType = {
    // Current school data
    school,
    schoolLoading: schoolLoading || addLoading || editLoading,
    schoolError: schoolError || addError || editError,

    // Edit mode state
    isEditing,
    schoolId: schoolId?.toString() || null,

    // Actions
    fetchSchool: refetch,
    postSchool,
    putSchool,

    // Dropdown options
    campusOptions,
    institutionTypeOptions,

    // Loading states
    campusesLoading,
    institutionTypesLoading,

    // Errors
    campusesError: campusesError || null,
    institutionTypesError: institutionTypesError || null,
  };

  return (
    <SchoolAddEditContext.Provider value={contextValue}>
      {children}
    </SchoolAddEditContext.Provider>
  );
};

export const useSchoolAddEdit = (): SchoolAddEditContextType => {
  const context = useContext(SchoolAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useSchoolAddEdit must be used within a SchoolAddEditProvider"
    );
  }
  return context;
};
