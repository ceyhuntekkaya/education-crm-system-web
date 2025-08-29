export interface BulkPricingOperationDto {
  operation?: string;
  pricingIds?: number[];
  newAcademicYear?: string;
  increasePercentage?: number;
  newStatus?: string;
  reason?: string;
  notifyParents?: boolean;
  advanceNoticeDays?: number;
}
