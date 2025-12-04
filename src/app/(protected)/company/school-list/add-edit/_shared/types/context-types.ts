import { SchoolDto, SchoolCreateDto } from "@/types";
import { ApiResponse } from "@/lib";
import { MutationOptions } from "@/hooks";
import {
  PropertyGroupCheckboxOption,
  InstitutionTypeOption,
  InstitutionGroupOption,
} from "../hooks";
import { SchoolPropertyDto } from "../hooks/use-school-properties";

export interface SchoolAddEditContextType {
  // Current school data
  school: SchoolDto | null;
  schoolLoading: boolean; // School verisi yüklenirken
  schoolError: string | null;

  // Edit mode state
  isEditing: boolean;
  schoolId: string | null;

  // Actions
  fetchSchool: (() => void) | undefined;
  postSchool: (
    data: SchoolCreateDto,
    mutationOptions?: MutationOptions<ApiResponse<SchoolDto>, SchoolCreateDto>
  ) => Promise<ApiResponse<SchoolDto> | null>;
  putSchool: (
    data: SchoolCreateDto,
    mutationOptions?: MutationOptions<ApiResponse<SchoolDto>, SchoolCreateDto>
  ) => Promise<ApiResponse<SchoolDto> | null>;
  updateProperties: (
    data: number[],
    mutationOptions?: MutationOptions<ApiResponse<any>, number[]> & {
      schoolId?: number;
    }
  ) => Promise<ApiResponse<any> | null>;

  // Dropdown options
  campusOptions: { value: string; label: string }[];
  institutionTypeOptions: InstitutionTypeOption[];
  institutionGroupOptions: InstitutionGroupOption[];
  languageOptions: { value: string; label: string }[];

  // Institution type helpers
  getFilteredTypesByGroupId: (
    groupId: string | undefined
  ) => InstitutionTypeOption[];
  getGroupIdByTypeId: (typeId: string | undefined) => string | undefined;

  // Property values (for displaying options)
  propertyCheckboxGroups: PropertyGroupCheckboxOption[];
  propertyValuesLoading: boolean;
  propertyValuesError: string | null;
  getGroupsByInstitutionTypeId: (
    institutionTypeId: number | string | undefined
  ) => PropertyGroupCheckboxOption[];

  // School properties (for edit mode - existing properties)
  schoolProperties: SchoolPropertyDto[];
  schoolPropertyTypeIds: number[];
  schoolPropertiesLoading: boolean;
  schoolPropertiesError: string | null;

  // Loading states
  campusesLoading: boolean;
  institutionTypesLoading: boolean;
  isSubmitting: boolean; // Form submit edilirken (add/edit/update properties)

  // Errors
  campusesError: string | null;
  institutionTypesError: string | null;
}
