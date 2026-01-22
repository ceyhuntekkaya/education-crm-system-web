import type { QuotationDto } from "@/types";
import type { MutationOptions } from "@/hooks/api";

/**
 * Context value type
 */
export interface QuotationDetailContextValue {
  // Data
  quotation: QuotationDto | null;
  isLoading: boolean;
  error: any;
  hasValidId: boolean;

  // Actions
  refetch: () => void;
  acceptQuotation: (
    data?: any,
    options?: MutationOptions<any, any>,
  ) => Promise<any | null>;
  rejectQuotation: (
    data?: any,
    options?: MutationOptions<any, any>,
  ) => Promise<any | null>;

  // Loading states
  isAccepting: boolean;
  isRejecting: boolean;
}

/**
 * Provider props type
 */
export interface QuotationDetailProviderProps {
  children: React.ReactNode;
  quotationId: number;
}
