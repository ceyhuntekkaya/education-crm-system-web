import type { CampusSummaryDto } from "../institution/CampusSummaryDto";
import type { ProvinceSummaryDto } from "../location/ProvinceSummaryDto";

export interface JobPostingDto {
  id: number;
  schoolId: number;
  campus: CampusSummaryDto;
  positionTitle: string;
  branch: string;
  employmentType: string;
  startDate: string; // YYYY-MM-DD
  contractDuration: string;
  requiredExperienceYears: number;
  requiredEducationLevel: string;
  salaryMin: number;
  salaryMax: number;
  showSalary: boolean;
  description: string;
  applicationDeadline: string; // YYYY-MM-DD
  status: "DRAFT" | "PUBLISHED" | "CLOSED" | "COMPLETED";
  isPublic: boolean;
  provinces: ProvinceSummaryDto[];
  applicationCount: number;
  createdAt: string;
  updatedAt: string;
}
