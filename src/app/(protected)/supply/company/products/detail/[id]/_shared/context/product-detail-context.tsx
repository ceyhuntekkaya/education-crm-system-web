"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  useProductById,
  useSupplierById,
  useProductDiscounts,
  useProductImages,
} from "../hooks/api";
import {
  useProductComputedValues,
  useProductImageGallery,
  useProductMessages,
} from "../hooks";
import {
  ProductDetailContextValue,
  ProductDetailProviderProps,
} from "../types";
import { TabType } from "../types";
import { useAuth } from "@/contexts";

const ProductDetailContext = createContext<
  ProductDetailContextValue | undefined
>(undefined);

export const ProductDetailProvider: React.FC<ProductDetailProviderProps> = ({
  children,
  productId,
}) => {
  const { user } = useAuth();

  const { product, isLoading, error, refetch } = useProductById(productId);

  // Product yüklendikten sonra supplierId ile supplier bilgisini çek
  const {
    supplier,
    isLoading: isLoadingSupplier,
    error: supplierError,
    refetch: refetchSupplier,
  } = useSupplierById(product?.supplierId);

  // UI State
  const [activeTab, setActiveTab] = useState<TabType>("details");

  // Favorite State
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlistId, setWishlistId] = useState<number | undefined>(undefined);

  // Helper değerleri hesapla
  const {
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
    hasValidId,
  } = useProductComputedValues(product, productId);

  // Product discounts
  const {
    discounts,
    activeDiscounts,
    hasActiveDiscount,
    isLoading: isLoadingDiscounts,
    error: discountsError,
    refetch: refetchDiscounts,
  } = useProductDiscounts(productId);

  // Product images
  const {
    images,
    isLoading: isLoadingImages,
    error: imagesError,
    refetch: refetchImages,
  } = useProductImages(productId);

  // Image gallery
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
  } = useProductImageGallery(product, images);

  // Messages and conversations
  const {
    conversationId,
    existingConversation,
    isCheckingConversation,
    conversationsError,
    refetchConversations,
    isSendingMessage,
    sendMessage,
    messages,
    isLoadingMessages,
    companyId,
  } = useProductMessages(productId, product, supplier);

  const contextValue: ProductDetailContextValue = {
    productId,
    product,
    supplier,
    isLoading,
    isLoadingSupplier,
    error,
    supplierError,
    refetch,
    refetchSupplier,
    statusInfo,
    stockInfo,
    priceWithTax,
    isLowStock,
    isOutOfStock,
    hasValidId,
    activeTab,
    setActiveTab,
    isFavorite,
    wishlistId,
    setIsFavorite,
    setWishlistId,
    // Discounts
    discounts,
    activeDiscounts,
    hasActiveDiscount,
    isLoadingDiscounts,
    discountsError,
    refetchDiscounts,
    // Images
    images,
    isLoadingImages,
    imagesError,
    refetchImages,
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
    // Conversations & Messages
    conversationId,
    existingConversation,
    isCheckingConversation,
    conversationsError,
    refetchConversations,
    isSendingMessage,
    sendMessage,
    messages,
    isLoadingMessages,
    companyId,
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
      "useProductDetail must be used within a ProductDetailProvider"
    );
  }
  return context;
};
