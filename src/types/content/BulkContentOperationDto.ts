export interface BulkContentOperationDto {
  operation?: string;
  entityIds?: number[];
  entityType?: string;
  validateOnly?: boolean;
}
