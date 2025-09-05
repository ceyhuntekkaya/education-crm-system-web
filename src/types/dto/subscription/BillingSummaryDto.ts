import { PaymentSummaryDto } from "./PaymentSummaryDto";

export interface BillingSummaryDto {
  subscriptionId?: number;
  campusName?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  currentPeriodAmount?: number;
  currentPeriodStatus?: string;
  nextBillingDate?: string;
  nextBillingAmount?: number;
  nextBillingCurrency?: string;
  recentPayments?: PaymentSummaryDto[];
  totalPaid?: number;
  totalOutstanding?: number;
  preferredPaymentMethod?: string;
}
