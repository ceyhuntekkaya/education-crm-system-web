export interface ContentExportDto {
  exportType?: string;
  schoolId?: number;
  startDate?: string;
  endDate?: string;
  format?: string;
  includeMedia?: boolean;
  includeComments?: boolean;
  includeAnalytics?: boolean;
  exportUrl?: string;
  exportStatus?: string;
  exportRequestDate?: string;
  exportCompletedDate?: string;
}
