import type {
  TeacherProfileDto,
  TeacherProfileCreateDto,
  TeacherProfileUpdateDto,
  TeacherEducationDto,
  TeacherEducationCreateDto,
  TeacherEducationUpdateDto,
  TeacherExperienceDto,
  TeacherExperienceCreateDto,
  TeacherExperienceUpdateDto,
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

  // Education
  educations: TeacherEducationDto[];
  isLoadingEducations: boolean;
  addEducation: (data: TeacherEducationCreateDto) => Promise<void>;
  updateEducation: (
    educationId: number,
    data: TeacherEducationUpdateDto,
  ) => Promise<void>;
  deleteEducation: (educationId: number) => Promise<void>;
  isSubmittingEducation: boolean;
  isDeletingEducation: boolean;
  refetchEducations: () => Promise<any>;

  // Experience
  experiences: TeacherExperienceDto[];
  isLoadingExperiences: boolean;
  addExperience: (data: TeacherExperienceCreateDto) => Promise<void>;
  updateExperience: (
    experienceId: number,
    data: TeacherExperienceUpdateDto,
  ) => Promise<void>;
  deleteExperience: (experienceId: number) => Promise<void>;
  isSubmittingExperience: boolean;
  isDeletingExperience: boolean;
  refetchExperiences: () => Promise<any>;
}
