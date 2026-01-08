import React from "react";
import type { SupplierDto } from "@/types";

/**
 * Supplier detail context için interface'ler
 */
export interface SupplierDetailContextValue {
  supplierId: number;
  supplier: SupplierDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  hasValidId: boolean;
}

export interface SupplierDetailProviderProps {
  children: React.ReactNode;
  supplierId: number;
}
