import type {
  TeacherProfileDto,
  TeacherProfileCreateDto,
  TeacherProfileUpdateDto,
} from "@/types";

export interface TeacherProfileAddEditContextValue {
  // Mod
  isEditMode: boolean;
  profileId: number;

  // Data
  teacherProfile: TeacherProfileDto | null;
  isLoading: boolean;
  error: any;

  // Actions
  isSaving: boolean;
  handleSubmit: () => Promise<void>;
  postProfile: (
    data: TeacherProfileCreateDto,
  ) => Promise<TeacherProfileDto | null>;
  putProfile: (
    data: TeacherProfileUpdateDto,
  ) => Promise<TeacherProfileDto | null>;
}
