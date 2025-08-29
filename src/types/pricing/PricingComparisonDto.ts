import { FeeChangeDto } from "./FeeChangeDto";

export interface PricingComparisonDto {
  fromYear?: string;
  toYear?: string;
  gradeLevel?: string;
  fromTotal?: number;
  toTotal?: number;
  totalChangeAmount?: number;
  totalChangePercentage?: number;
  feeChanges?: FeeChangeDto[];
  overallTrend?: string;
}
