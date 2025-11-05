"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts";
import { SchoolAddEditContextType } from "../types";
import {
  useSchoolById,
  useAddSchool,
  useEditSchool,
  useInstitutionTypes,
  useCampusesByBrand,
  useLanguageOptions,
  usePropertyValues,
  useSchoolProperties,
  useUpdateSchoolProperties,
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
  const brandId = user?.brand?.id || null;

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

  // Dil seçenekleri hook'u
  const { languageOptions } = useLanguageOptions();

  // Property values hook'u
  const {
    propertyCheckboxGroups,
    isLoading: propertyValuesLoading,
    error: propertyValuesError,
    getGroupsByInstitutionTypeId,
  } = usePropertyValues();

  // School properties hook'u (edit mode için mevcut property'leri çek)
  // ✅ Sıralı yükleme: School ve Institution Types yüklendikten SONRA properties çek
  const shouldFetchProperties =
    isEditing &&
    schoolId &&
    !schoolLoading &&
    !institutionTypesLoading &&
    school?.institutionType?.id;

  const {
    properties: schoolProperties,
    propertyTypeIds: schoolPropertyTypeIds,
    isLoading: schoolPropertiesLoading,
    error: schoolPropertiesError,
    refetch: refetchProperties,
  } = useSchoolProperties({
    schoolId: shouldFetchProperties ? schoolId : null,
  });

  // Update school properties hook'u (edit mode için)
  const {
    updateProperties,
    isLoading: updatePropertiesLoading,
    error: updatePropertiesError,
  } = useUpdateSchoolProperties(schoolId ?? null, refetchProperties);

  const contextValue: SchoolAddEditContextType = {
    // Current school data
    school,
    schoolLoading, // Sadece school fetch loading
    schoolError: schoolError || addError || editError,

    // Edit mode state
    isEditing,
    schoolId: schoolId?.toString() || null,

    // Actions
    fetchSchool: refetch,
    postSchool,
    putSchool,
    updateProperties,

    // Dropdown options
    campusOptions,
    institutionTypeOptions,
    languageOptions,

    // Property values
    propertyCheckboxGroups,
    propertyValuesLoading,
    propertyValuesError,
    getGroupsByInstitutionTypeId,

    // School properties (edit mode)
    schoolProperties,
    schoolPropertyTypeIds,
    schoolPropertiesLoading,
    schoolPropertiesError,

    // Loading states
    campusesLoading,
    institutionTypesLoading,
    isSubmitting: addLoading || editLoading || updatePropertiesLoading, // Submit loading

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
