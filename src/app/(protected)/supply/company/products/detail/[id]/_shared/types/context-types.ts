import React from "react";
import { ProductDto, SupplierDto } from "@/types";
import { StatusInfo, StockInfo } from "../utils/product-helpers";
import { TabType } from "./page-types";

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
  // Helper değerler
  statusInfo: StatusInfo;
  stockInfo: StockInfo;
  priceWithTax: number | undefined;
  isLowStock: boolean;
  isOutOfStock: boolean;
  hasValidId: boolean;
  // UI State
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  // Favorite State
  isFavorite: boolean;
  wishlistId: number | undefined;
  setIsFavorite: (isFavorite: boolean) => void;
  setWishlistId: (wishlistId: number | undefined) => void;
}

export interface ProductDetailProviderProps {
  children: React.ReactNode;
  productId: number;
}
