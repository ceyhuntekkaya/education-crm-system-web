import type { QuotationDto } from "@/types";

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
}

/**
 * Provider props type
 */
export interface QuotationDetailProviderProps {
  children: React.ReactNode;
  quotationId: number;
}
