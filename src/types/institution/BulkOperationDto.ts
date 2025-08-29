export interface BulkOperationDto {
  operation?: 'CREATE' | 'UPDATE' | 'DELETE' | 'ACTIVATE' | 'DEACTIVATE';
  entityIds?: number[];
  updateData?: Record<string, unknown>;
  validateOnly?: boolean;
}
