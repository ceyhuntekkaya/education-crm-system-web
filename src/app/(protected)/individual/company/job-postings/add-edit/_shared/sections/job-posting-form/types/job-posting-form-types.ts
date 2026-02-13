import type { JobPostingFormValues } from "../schemas/job-posting-schema";

export interface JobPostingFormProps {
  className?: string;
  initialData?: Partial<JobPostingFormValues>;
}

export interface JobPostingFormHandle {
  submit: () => Promise<number | null>;
  validate: () => Promise<boolean>;
  getValues: () => JobPostingFormValues;
}
