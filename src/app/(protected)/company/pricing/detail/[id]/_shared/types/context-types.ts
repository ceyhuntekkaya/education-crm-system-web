import React from "react";
import { SchoolPricingDto } from "@/types";

/**
 * Pricing detail context için interface'ler
 */
export interface PricingDetailContextValue {
  pricingId: number;
  pricing: SchoolPricingDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface PricingDetailProviderProps {
  children: React.ReactNode;
  pricingId: number;
}
