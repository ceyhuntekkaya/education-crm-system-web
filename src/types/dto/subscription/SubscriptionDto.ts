import { CampusSummaryDto } from "../institution";
import { InvoiceSummaryDto } from "./InvoiceSummaryDto";
import { PaymentSummaryDto } from "./PaymentSummaryDto";
import { SubscriptionPlanSummaryDto } from "./SubscriptionPlanSummaryDto";

export interface SubscriptionDto {
  /** Format: int64 */
  id?: number;
  /** @enum {string} */
  status?: "TRIAL" | "ACTIVE" | "PAST_DUE" | "CANCELED" | "EXPIRED" | "SUSPENDED" | "PENDING";
  /** Format: date-time */
  startDate?: string;
  /** Format: date-time */
  endDate?: string;
  /** Format: date-time */
  trialEndDate?: string;
  /** Format: date-time */
  nextBillingDate?: string;
  price?: number;
  currency?: string;
  discountAmount?: number;
  /** Format: double */
  discountPercentage?: number;
  couponCode?: string;
  autoRenew?: boolean;
  /** Format: date-time */
  canceledAt?: string;
  cancellationReason?: string;
  /** Format: date-time */
  gracePeriodEnd?: string;
  /** Format: int32 */
  currentSchoolsCount?: number;
  /** Format: int32 */
  currentUsersCount?: number;
  /** Format: int32 */
  currentMonthAppointments?: number;
  /** Format: int32 */
  currentGalleryItems?: number;
  /** Format: int32 */
  currentMonthPosts?: number;
  /** Format: int64 */
  storageUsedMb?: number;
  billingName?: string;
  billingEmail?: string;
  billingPhone?: string;
  billingAddress?: string;
  taxNumber?: string;
  taxOffice?: string;
  campus?: CampusSummaryDto;
  subscriptionPlan?: SubscriptionPlanSummaryDto;
  recentPayments?: PaymentSummaryDto[];
  recentInvoices?: InvoiceSummaryDto[];
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
};