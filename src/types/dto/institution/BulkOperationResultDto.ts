export interface BulkOperationResultDto {
  success?: boolean;
  totalRecords?: number;
  successfulOperations?: number;
  failedOperations?: number;
  errors?: string[];
  warnings?: string[];
  operationId?: string;
  operationDate?: string;
}
