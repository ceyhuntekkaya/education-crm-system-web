export interface SubscriptionPlanDto {
  id?: number;
  name?: string;
  displayName?: string;
  description?: string;
  price?: number;
  billingPeriod?: string;
  trialDays?: number;
  maxSchools?: number;
  maxUsers?: number;
  maxAppointmentsPerMonth?: number;
  maxGalleryItems?: number;
  maxPostsPerMonth?: number;
  hasAnalytics?: boolean;
  hasCustomDomain?: boolean;
  hasApiAccess?: boolean;
  hasPrioritySupport?: boolean;
  hasWhiteLabel?: boolean;
  storageGb?: number;
}
