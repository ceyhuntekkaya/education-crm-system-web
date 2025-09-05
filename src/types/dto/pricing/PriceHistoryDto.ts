export interface PriceHistoryDto {
  id?: number;
  schoolPricingId?: number;
  schoolName?: string;
  academicYear?: string;
  gradeLevel?: string;
  changedByUserName?: string;
  changeDate?: string;
  changeType?: string;
  fieldName?: string;
  fieldDisplayName?: string;
  oldValue?: number;
  newValue?: number;
  changePercentage?: number;
  changeAmount?: number;
  reason?: string;
  changeNotes?: string;
  effectiveDate?: string;
  approvedByUserName?: string;
  approvedAt?: string;
  affectedStudentsCount?: number;
  revenueImpact?: number;
}
