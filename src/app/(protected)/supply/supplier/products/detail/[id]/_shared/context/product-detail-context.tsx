"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useProductsContext } from "../../../../_shared/contexts";
import { useSupplierById } from "../hooks/api/use-supplier-by-id";
import { useProductComputedValues } from "../../../../_shared/hooks/use-product-computed-values";
import { useProductImageGallery } from "../hooks";
import {
  ProductDetailContextValue,
  ProductDetailProviderProps,
} from "../types";
import { TabType } from "../types";

const ProductDetailContext = createContext<
  ProductDetailContextValue | undefined
>(undefined);

export const ProductDetailProvider: React.FC<ProductDetailProviderProps> = ({
  children,
  productId,
}) => {
  // Ana products context'ten sadece setCurrentProductId'yi al
  // Diğer veriler hook'lar tarafından direkt context'ten alınıyor
  const { setCurrentProductId } = useProductsContext();

  // Current product ID'yi context'e set et
  useEffect(() => {
    setCurrentProductId(productId);
  }, [productId, setCurrentProductId]);

  // Supplier bilgisini çek (context'ten product.supplierId alır)
  const {
    supplier,
    isLoading: isLoadingSupplier,
    error: supplierError,
    refetch: refetchSupplier,
  } = useSupplierById();

  // UI State
  const [activeTab, setActiveTab] = useState<TabType>("details");

  // Helper değerleri hesapla (context'ten product ve productId alır)
  const {
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
    hasValidId,
  } = useProductComputedValues();

  // Image gallery (context'ten product ve images alır)
  const {
    selectedImageIndex,
    setSelectedImageIndex,
    isLightboxOpen,
    setIsLightboxOpen,
    zoomPosition,
    isZooming,
    setIsZooming,
    mainImageRef,
    lightboxImageRef,
    allImages,
    selectedImage,
    handleNextImage,
    handlePreviousImage,
    handleImageMouseMove,
  } = useProductImageGallery();

  const contextValue: ProductDetailContextValue = {
    productId,
    supplier,
    isLoadingSupplier,
    supplierError,
    refetchSupplier,
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
    hasValidId,
    activeTab,
    setActiveTab,
    // Image Gallery
    selectedImageIndex,
    setSelectedImageIndex,
    isLightboxOpen,
    setIsLightboxOpen,
    zoomPosition,
    isZooming,
    setIsZooming,
    mainImageRef,
    lightboxImageRef,
    allImages,
    selectedImage,
    handleNextImage,
    handlePreviousImage,
    handleImageMouseMove,
  };

  return (
    <ProductDetailContext.Provider value={contextValue}>
      {children}
    </ProductDetailContext.Provider>
  );
};

/**
 * ProductDetail context'ini kullanmak için hook
 */
export const useProductDetail = (): ProductDetailContextValue => {
  const context = useContext(ProductDetailContext);
  if (context === undefined) {
    throw new Error(
      "useProductDetail must be used within a ProductDetailProvider",
    );
  }
  return context;
};
