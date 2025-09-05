export interface BulkCampaignResultDto {
  success?: boolean;
  totalRecords?: number;
  successfulOperations?: number;
  failedOperations?: number;
  errors?: string[];
  warnings?: string[];
  operationId?: string;
  operationDate?: string;
  affectedCampaignIds?: number[];
  affectedSchoolIds?: number[];
}
