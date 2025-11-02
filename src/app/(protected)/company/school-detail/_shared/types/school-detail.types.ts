import { ReactNode } from "react";

/**
 * School Detail Provider Props
 */
export interface SchoolDetailProviderProps {
  children: ReactNode;
}

/**
 * School Property Item Interface
 */
export interface SchoolPropertyDto {
  schoolId: number;
  propertyTypeId: number;
  institutionPropertyValueId: number;
  institutionPropertyId: number;
  name: string;
  displayName: string;
  propertyGroupTypeId: number;
  sortOrder: number;
  groupName: string;
  groupDisplayName: string;
  institutionTypeId: number;
  institutionTypeName: string;
  groupSortOrder: number;
}

/**
 * Grouped School Properties Interface
 */
export interface GroupedSchoolProperty {
  groupId: number;
  groupName: string;
  groupDisplayName: string;
  groupSortOrder: number;
  properties: SchoolPropertyDto[];
}
