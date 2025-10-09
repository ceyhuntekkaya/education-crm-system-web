export interface SubscriptionPlanSummaryDto {
  /** Format: int64 */
  id?: number;
  name?: string;
  displayName?: string;
  price?: number;
  /** @enum {string} */
  billingPeriod?: "MONTHLY" | "QUARTERLY" | "YEARLY" | "ONETIME";
  isPopular?: boolean;
  hasAnalytics?: boolean;
  hasPrioritySupport?: boolean;
  /** Format: int32 */
  storageGb?: number;
  /** Format: int32 */
  subscriberCount?: number;
};