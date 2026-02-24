import type { CampusSummaryDto } from "../institution/CampusSummaryDto";

export interface JobPostingSummaryDto {
  id: number;
  positionTitle: string;
  branch: string;
  employmentType: string;
  applicationDeadline: string; // "YYYY-MM-DD"
  status: string;
  campus: CampusSummaryDto;
}
