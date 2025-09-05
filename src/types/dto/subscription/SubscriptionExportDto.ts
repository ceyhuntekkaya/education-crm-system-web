export interface SubscriptionExportDto {
  exportType?: string;
  format?: string;
  startDate?: string;
  endDate?: string;
  includedFields?: string[];
  filters?: Record<string, any>;
  includeInactiveSubscriptions?: boolean;
  includePaymentDetails?: boolean;
  includeUsageMetrics?: boolean;
  includeBillingHistory?: boolean;
  exportStatus?: string;
  downloadUrl?: string;
  requestedAt?: string;
  completedAt?: string;
  fileSizeBytes?: number;
  passwordProtected?: boolean;
  expiresAt?: string;
}
