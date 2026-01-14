import React, { RefObject } from "react";
import { ProductDto, SupplierDto, ProductDiscountDto } from "@/types";
import { ConversationDto } from "@/types/dto/supply";
import { StatusInfo, StockInfo } from "../utils/product-helpers";
import { TabType } from "./page-types";
import { ProductImageDto } from "../hooks/api";

interface ImageGalleryItem {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isMain: boolean;
}

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
  // Discounts
  discounts: ProductDiscountDto[];
  activeDiscounts: ProductDiscountDto[];
  hasActiveDiscount: boolean;
  isLoadingDiscounts: boolean;
  discountsError: string | null;
  refetchDiscounts: () => void;
  // Images
  images: ProductImageDto[];
  isLoadingImages: boolean;
  imagesError: string | null;
  refetchImages: () => void;
  // Image Gallery
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
  isLightboxOpen: boolean;
  setIsLightboxOpen: (isOpen: boolean) => void;
  zoomPosition: { x: number; y: number };
  isZooming: boolean;
  setIsZooming: (isZooming: boolean) => void;
  mainImageRef: RefObject<HTMLDivElement>;
  lightboxImageRef: RefObject<HTMLDivElement>;
  allImages: ImageGalleryItem[];
  selectedImage: ImageGalleryItem | undefined;
  handleNextImage: () => void;
  handlePreviousImage: () => void;
  handleImageMouseMove: (
    e: React.MouseEvent<HTMLDivElement>,
    isLightbox?: boolean
  ) => void;
  // Conversations & Messages
  conversationId: number | null;
  existingConversation: ConversationDto | null;
  isCheckingConversation: boolean;
  conversationsError: string | null;
  refetchConversations: () => void;
  isSendingMessage: boolean;
  sendMessage: (content: string) => Promise<boolean>;
  messages: any[];
  isLoadingMessages: boolean;
  companyId: number;
}

export interface ProductDetailProviderProps {
  children: React.ReactNode;
  productId: number;
}
