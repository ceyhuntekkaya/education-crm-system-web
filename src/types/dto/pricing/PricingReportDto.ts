import { SchoolPricingDto } from "./SchoolPricingDto";
import { PricingStatisticsDto } from "./PricingStatisticsDto";

export interface PricingReportDto {
  reportName?: string;
  generatedAt?: string;
  generatedBy?: string;
  filterSchoolIds?: number[];
  filterGradeLevels?: string[];
  filterAcademicYears?: string[];
  filterStartDate?: string;
  filterEndDate?: string;
  pricingDetails?: SchoolPricingDto[];
  statistics?: PricingStatisticsDto;
}
