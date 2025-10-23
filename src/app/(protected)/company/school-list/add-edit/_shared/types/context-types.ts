import { SchoolDto, SchoolCreateDto } from "@/types";

export interface SchoolAddEditContextType {
  // Current school data
  school: SchoolDto | null;
  schoolLoading: boolean;
  schoolError: string | null;

  // Edit mode state
  isEditing: boolean;
  schoolId: string | null;

  // Actions
  fetchSchool: (() => void) | undefined;
  postSchool: (data: SchoolCreateDto) => Promise<SchoolDto | null>;
  putSchool: (data: SchoolCreateDto) => Promise<SchoolDto | null>;

  // Dropdown options
  campusOptions: { value: string; label: string }[];
  institutionTypeOptions: { value: string; label: string }[];

  // Loading states
  campusesLoading: boolean;
  institutionTypesLoading: boolean;

  // Errors
  campusesError: string | null;
  institutionTypesError: string | null;
}
