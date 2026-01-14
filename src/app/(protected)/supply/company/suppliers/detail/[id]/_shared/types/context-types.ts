import React from "react";
import type { SupplierDto, ProductSummaryDto } from "@/types";

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
  // Ürün verileri
  products: ProductSummaryDto[];
  productsLoading: boolean;
  productsError: string | null;
  productsTotal: number;
  refetchProducts: () => void;
}

export interface SupplierDetailProviderProps {
  children: React.ReactNode;
  supplierId: number;
}
