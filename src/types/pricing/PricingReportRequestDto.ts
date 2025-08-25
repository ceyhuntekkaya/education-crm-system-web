export interface PricingReportRequestDto {
  schoolIds?: number[];
  gradeLevels?: string[];
  academicYears?: string[];
  startDate?: string;
  endDate?: string;
}
