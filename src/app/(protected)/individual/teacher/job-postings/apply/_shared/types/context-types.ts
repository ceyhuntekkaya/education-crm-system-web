import type { JobPostingDto } from "@/types";

/**
 * Başvuru formu context değerleri
 */
export interface ApplicationAddContextValue {
  // Job posting data
  jobPosting: JobPostingDto | null;
  jobPostingLoading: boolean;

  // Teacher profile ID
  teacherProfileId: number | null;

  // Application submission
  submitApplication: (data: any) => Promise<any>;
  submitting: boolean;
}
