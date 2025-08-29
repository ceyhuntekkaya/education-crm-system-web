export interface AnalyticsExportDto {
  exportId?: string;
  exportName?: string;
  exportType?: 'ANALYTICS' | 'VISITORS' | 'SEARCHES' | 'PERFORMANCE';
  format?: 'CSV' | 'EXCEL' | 'JSON' | 'PDF';
  startDate?: string;
  endDate?: string;
  includedMetrics?: string[];
  filters?: Record<string, unknown>;
  status?: 'REQUESTED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  progress?: number;
  downloadUrl?: string;
  requestedAt?: string;
  completedAt?: string;
  fileSizeBytes?: number;
  requestedBy?: string;
  requestedByEmail?: string;
  isPublic?: boolean;
  shareUrl?: string;
  expiresAt?: string;
}
