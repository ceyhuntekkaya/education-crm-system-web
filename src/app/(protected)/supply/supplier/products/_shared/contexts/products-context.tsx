"use client";

import React, { createContext, useContext, useState } from "react";
import {
  useGetProductsBySupplier,
  useProductById,
  useProductImages,
  useProductDiscounts,
  useProductVariants,
} from "../hooks/api";
import type {
  ProductDto,
  ProductDiscountDto,
  ProductImageDto,
  ProductVariantDto,
} from "@/types";

/**
 * 🔍 PRODUCTS CONTEXT
 * Ortak ürün verileri ve detay bilgileri
 */

interface ProductsContextValue {
  // Liste verileri
  products: ProductDto[];
  productsListLoading: boolean;
  productsListError: any;
  refetch: () => void;

  // Detay verileri (currentProductId bazında)
  currentProductId: number | null;
  setCurrentProductId: (id: number | null) => void;
  currentProduct: ProductDto | null;
  currentProductLoading: boolean;
  currentProductError: string | null;
  refetchCurrentProduct: () => void;

  // Görsel verileri
  currentProductImages: ProductImageDto[];
  currentProductImagesLoading: boolean;
  currentProductImagesError: string | null;
  refetchCurrentProductImages: () => void;

  // İndirim verileri
  currentProductDiscounts: ProductDiscountDto[];
  currentProductDiscountsLoading: boolean;
  currentProductDiscountsError: string | null;
  refetchCurrentProductDiscounts: () => void;
  currentProductActiveDiscounts: ProductDiscountDto[];
  currentProductHasActiveDiscount: boolean;

  // Varyant verileri
  currentProductVariants: ProductVariantDto[];
  currentProductVariantsLoading: boolean;
  currentProductVariantsError: string | null;
  refetchCurrentProductVariants: () => void;
  currentProductActiveVariants: ProductVariantDto[];
  currentProductHasActiveVariants: boolean;
}

interface ProductsProviderProps {
  children: React.ReactNode;
  supplierId: number;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

export function ProductsProvider({
  children,
  supplierId,
}: ProductsProviderProps) {
  // Current product ID state - add-edit veya detail sayfası tarafından set edilecek
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);

  // 📊 API DATA - Ürün listesi
  const { data, loading, error, refetch } =
    useGetProductsBySupplier(supplierId);

  // Raw API verisini ProductDto[] formatına dönüştür
  const products: ProductDto[] = data?.data?.content || [];

  // 🔍 CURRENT PRODUCT DATA - Detay bilgileri
  const {
    product: currentProduct,
    isLoading: currentProductLoading,
    error: currentProductError,
    refetch: refetchCurrentProduct,
  } = useProductById(currentProductId);

  // 🖼️ CURRENT PRODUCT IMAGES
  const {
    images: currentProductImages,
    isLoading: currentProductImagesLoading,
    error: currentProductImagesError,
    refetch: refetchCurrentProductImages,
  } = useProductImages(currentProductId);

  // 💰 CURRENT PRODUCT DISCOUNTS
  const {
    discounts: currentProductDiscounts,
    isLoading: currentProductDiscountsLoading,
    error: currentProductDiscountsError,
    refetch: refetchCurrentProductDiscounts,
    activeDiscounts: currentProductActiveDiscounts,
    hasActiveDiscount: currentProductHasActiveDiscount,
  } = useProductDiscounts(currentProductId);

  // 🔄 CURRENT PRODUCT VARIANTS
  const {
    variants: currentProductVariants,
    isLoading: currentProductVariantsLoading,
    error: currentProductVariantsError,
    refetch: refetchCurrentProductVariants,
    activeVariants: currentProductActiveVariants,
    hasActiveVariants: currentProductHasActiveVariants,
  } = useProductVariants(currentProductId);

  // 🎯 CONTEXT VALUE
  const contextValue: ProductsContextValue = {
    // Liste verileri
    products,
    productsListLoading: loading,
    productsListError: error,
    refetch,

    // Detay verileri
    currentProductId,
    setCurrentProductId,
    currentProduct,
    currentProductLoading,
    currentProductError,
    refetchCurrentProduct,

    // Görsel verileri
    currentProductImages,
    currentProductImagesLoading,
    currentProductImagesError,
    refetchCurrentProductImages,

    // İndirim verileri
    currentProductDiscounts,
    currentProductDiscountsLoading,
    currentProductDiscountsError,
    refetchCurrentProductDiscounts,
    currentProductActiveDiscounts,
    currentProductHasActiveDiscount,

    // Varyant verileri
    currentProductVariants,
    currentProductVariantsLoading,
    currentProductVariantsError,
    refetchCurrentProductVariants,
    currentProductActiveVariants,
    currentProductHasActiveVariants,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider",
    );
  }
  return context;
}

export default ProductsContext;
