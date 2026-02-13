export interface JobPostingCreateDto {
  schoolId: number; // Zorunlu
  positionTitle: string; // Zorunlu, max 200
  branch: string; // Zorunlu, max 100
  employmentType?: string; // max 50
  startDate?: string; // "YYYY-MM-DD"
  contractDuration?: string; // max 100
  requiredExperienceYears?: number;
  requiredEducationLevel?: string; // max 50
  salaryMin?: number;
  salaryMax?: number;
  showSalary?: boolean; // default: false
  description?: string;
  applicationDeadline?: string; // "YYYY-MM-DD"
  status?: "DRAFT" | "PUBLISHED" | "CLOSED" | "COMPLETED"; // default: "DRAFT"
  isPublic?: boolean; // default: true
  provinceIds?: number[]; // İl ID listesi
}
