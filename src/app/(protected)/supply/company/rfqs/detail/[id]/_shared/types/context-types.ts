import React from "react";
import type { RFQDto } from "@/types";

/**
 * RFQ detail context için interface'ler
 */
export interface RFQDetailContextValue {
  rfqId: number;
  rfq: RFQDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  hasValidId: boolean;
}

export interface RFQDetailProviderProps {
  children: React.ReactNode;
  rfqId: number;
}
