import React from "react";
import { ProductDto, SupplierDto } from "@/types";

/**
 * Product detail context için interface'ler
 */
export interface ProductDetailContextValue {
  productId: number;
  product: ProductDto | null;
  supplier: SupplierDto | null;
  isLoading: boolean;
  isLoadingSupplier: boolean;
  error: string | null;
  supplierError: string | null;
  refetch: () => void;
  refetchSupplier: () => void;
}

export interface ProductDetailProviderProps {
  children: React.ReactNode;
  productId: number;
}
