export interface JobPostingUpdateDto {
  positionTitle?: string;
  branch?: string;
  employmentType?: string;
  startDate?: string;
  contractDuration?: string;
  requiredExperienceYears?: number;
  requiredEducationLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  showSalary?: boolean;
  description?: string;
  applicationDeadline?: string;
  status?: "DRAFT" | "PUBLISHED" | "CLOSED" | "COMPLETED";
  isPublic?: boolean;
  provinceIds?: number[];
}
