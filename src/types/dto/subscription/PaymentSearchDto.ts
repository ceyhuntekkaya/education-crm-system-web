export interface PaymentSearchDto {
  searchTerm?: string;
  subscriptionId?: number;
  statuses?: string[];
  paymentMethods?: string[];
  paymentDateAfter?: string;
  paymentDateBefore?: string;
  dueDateAfter?: string;
  dueDateBefore?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  gatewayName?: string;
  isRefunded?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}
