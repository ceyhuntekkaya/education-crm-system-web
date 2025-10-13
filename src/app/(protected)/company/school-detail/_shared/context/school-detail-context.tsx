"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { useCompany } from "@/app/(protected)/company/_shared";
import { SchoolDto } from "@/types";

// Local type definition to avoid circular dependency
export interface SchoolDetailContextType {
  currentSchool: SchoolDto | null;
  isLoading: boolean;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  updateSchool: (school: SchoolDto) => void;
  refreshSchool: () => void;
  // Company context'ten gelen değerler
  selectedSchool: { id: number; name: string } | null;
  schools: { id: number; name: string }[];
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
  const [isEditing, setIsEditing] = useState(false);

  // Get the current school from company context - convert simple school to SchoolDto
  const currentSchool = useMemo(() => {
    if (!selectedSchool) return null;

    // Convert simple School type to SchoolDto format
    // In real implementation, you would fetch full school details from API
    return {
      id: selectedSchool.id,
      name: selectedSchool.name,
      slug: `school-${selectedSchool.id}`,
      description: undefined,
      logoUrl: undefined,
      coverImageUrl: undefined,
      email: undefined,
      phone: undefined,
      extension: undefined,
      minAge: undefined,
      maxAge: undefined,
      capacity: undefined,
      currentStudentCount: undefined,
      classSizeAverage: undefined,
      curriculumType: undefined,
      languageOfInstruction: undefined,
      foreignLanguages: undefined,
      registrationFee: undefined,
      monthlyFee: undefined,
      annualFee: undefined,
      metaTitle: undefined,
      metaDescription: undefined,
      metaKeywords: undefined,
      viewCount: undefined,
      ratingAverage: undefined,
      ratingCount: undefined,
      likeCount: undefined,
      postCount: undefined,
      campus: undefined,
    } as SchoolDto;
  }, [selectedSchool]);

  const updateSchool = (updatedSchool: SchoolDto) => {
    // TODO: Implement API call to update school
    console.log("Updating school:", updatedSchool);
    setIsEditing(false);
  };

  const refreshSchool = () => {
    // TODO: Implement API call to refresh school data
    console.log("Refreshing school data");
  };

  const contextValue: SchoolDetailContextType = {
    currentSchool,
    isLoading: !isInitialized,
    isEditing,
    setIsEditing,
    updateSchool,
    refreshSchool,
    selectedSchool,
    schools,
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
