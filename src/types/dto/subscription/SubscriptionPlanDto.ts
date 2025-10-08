export interface SubscriptionPlanDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  displayName?: string;
  description?: string;
  price?: number;
  /** @enum {string} */
  billingPeriod?: "MONTHLY" | "QUARTERLY" | "YEARLY" | "ONETIME";
  /** Format: int32 */
  trialDays?: number;
  /** Format: int32 */
  maxSchools?: number;
  /** Format: int32 */
  maxUsers?: number;
  /** Format: int32 */
  maxAppointmentsPerMonth?: number;
  /** Format: int32 */
  maxGalleryItems?: number;
  /** Format: int32 */
  maxPostsPerMonth?: number;
  hasAnalytics?: boolean;
  hasCustomDomain?: boolean;
  hasApiAccess?: boolean;
  hasPrioritySupport?: boolean;
  hasWhiteLabel?: boolean;
  /** Format: int32 */
  storageGb?: number;
  isPopular?: boolean;
  /** Format: int32 */
  sortOrder?: number;
  isVisible?: boolean;
  pricingTiers?: string;
  features?: string;
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
};