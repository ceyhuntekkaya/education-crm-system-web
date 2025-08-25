export interface BulkLocationImportDto {
  fileUrl?: string;
  fileType?: 'CSV' | 'EXCEL';
  validateOnly?: boolean;
  overwriteExisting?: boolean;
  mappingConfiguration?: string;
}
