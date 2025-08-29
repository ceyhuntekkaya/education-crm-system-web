import { PlanRevenueDto } from "./PlanRevenueDto";

export interface RevenueAnalyticsDto {
  period?: string;
  periodStart?: string;
  periodEnd?: string;
  totalRevenue?: number;
  newCustomerRevenue?: number;
  existingCustomerRevenue?: number;
  upgradeRevenue?: number;
  downgradeRevenue?: number;
  newCustomers?: number;
  churnedCustomers?: number;
  upgradedCustomers?: number;
  downgradedCustomers?: number;
  planRevenues?: PlanRevenueDto[];
  projectedRevenue?: number;
  confidenceInterval?: number;
}
