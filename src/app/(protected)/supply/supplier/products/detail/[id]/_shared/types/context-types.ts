import React, { RefObject } from "react";
import { ProductDto, SupplierDto, ProductDiscountDto, ProductImageDto } from "@/types";
import { StatusInfo, StockInfo } from "../utils/product-helpers";
import { TabType } from "./page-types";

interface ImageGalleryItem {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isMain: boolean;
}

/**
 * Product detail context için interface'ler
 * Gereksiz tekrar eden veriler kaldırıldı - useProductsContext'ten alınıyor
 */
export interface ProductDetailContextValue {
  productId: number;
  supplier: SupplierDto | null;
  isLoadingSupplier: boolean;
  supplierError: string | null;
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
    isLightbox?: boolean,
  ) => void;
}

export interface ProductDetailProviderProps {
  children: React.ReactNode;
  productId: number;
}
