import type {
  TeacherProfileDto,
  TeacherProfileCreateDto,
  TeacherProfileUpdateDto,
} from "@/types";

export interface SelectOption {
  value: string;
  label: string;
}

export interface TeacherProfileAddEditContextValue {
  // Current profile data
  teacherProfile: TeacherProfileDto | null;
  profileDetailLoading: boolean; // Veri çekerken gösterilecek loading
  profileSubmitLoading: boolean; // Form submit edilirken button loading
  profileError: string | null;

  // Edit mode state
  isEditMode: boolean;
  profileId: string | null;

  // Location options
  cityOptions: SelectOption[];
  provinceOptions: SelectOption[];
  provincesLoading: boolean;

  // Actions
  postProfile: (
    data: TeacherProfileCreateDto,
  ) => Promise<TeacherProfileDto | null>;
  putProfile: (
    data: TeacherProfileUpdateDto,
  ) => Promise<TeacherProfileDto | null>;
}
