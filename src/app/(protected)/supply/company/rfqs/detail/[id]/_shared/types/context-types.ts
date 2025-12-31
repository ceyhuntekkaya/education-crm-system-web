import React from "react";
import { QuotationDto } from "@/types";

/**
 * Quotation detail context için interface'ler
 */
export interface QuotationDetailContextValue {
  quotationId: number;
  quotation: QuotationDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  hasValidId: boolean;
}

export interface QuotationDetailProviderProps {
  children: React.ReactNode;
  quotationId: number;
}

