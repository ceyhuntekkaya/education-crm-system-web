export interface LocationImportResultDto {
  success?: boolean;
  totalRecords?: number;
  successfulImports?: number;
  failedImports?: number;
  skippedRecords?: number;
  errors?: string[];
  warnings?: string[];
  importId?: string;
  importDate?: string;
}
