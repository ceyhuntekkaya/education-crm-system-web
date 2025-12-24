import React from "react";
import { ProductDto } from "@/types";

/**
 * Product detail context için interface'ler
 */
export interface ProductDetailContextValue {
  productId: number;
  product: ProductDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface ProductDetailProviderProps {
  children: React.ReactNode;
  productId: number;
}
