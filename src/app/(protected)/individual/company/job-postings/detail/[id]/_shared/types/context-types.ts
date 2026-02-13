import type { JobPostingDto } from "@/types";

export interface JobPostingDetailContextValue {
  // Data
  jobPosting: JobPostingDto | null;
  isLoading: boolean;
  error: any;
  jobPostingId: number;

  // Actions
  refetch: () => void;
}
