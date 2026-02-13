import type {
  JobPostingDto,
  JobPostingCreateDto,
  JobPostingUpdateDto,
} from "@/types";

export interface JobPostingAddEditContextValue {
  // Mode
  isEditMode: boolean;
  jobPostingId: number;
  schoolId: number;

  // Data
  jobPosting: JobPostingDto | null;
  isLoading: boolean;
  error: any;

  // Actions
  isSaving: boolean;
  handleSubmit: () => Promise<void>;
  postJobPosting: (data: JobPostingCreateDto) => Promise<JobPostingDto | null>;
  putJobPosting: (data: JobPostingUpdateDto) => Promise<JobPostingDto | null>;
}
