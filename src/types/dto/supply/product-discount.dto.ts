/**
 * Supply Product Discount DTOs
 * Ürün indirimleri ile ilgili veri transfer objeleri
 */

/**
 * İndirim tipi enum
 */
export const ProductDiscountDtoDiscountType = {
  PERCENTAGE: "PERCENTAGE",
  FIXED_AMOUNT: "FIXED_AMOUNT",
  FREE_MONTHS: "FREE_MONTHS",
  BUY_X_GET_Y: "BUY_X_GET_Y",
  TIERED: "TIERED",
  BUNDLE: "BUNDLE",
  NO_DISCOUNT: "NO_DISCOUNT",
} as const;

export type ProductDiscountDtoDiscountType =
  (typeof ProductDiscountDtoDiscountType)[keyof typeof ProductDiscountDtoDiscountType];

/**
 * Ürün indirim detay bilgileri
 */
export interface ProductDiscountDto {
  id?: number;
  productId?: number;
  productName?: string;
  discountName?: string;
  discountType?: ProductDiscountDtoDiscountType;
  discountValue?: number;
  minQuantity?: number;
  maxQuantity?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  createdAt?: string;
}

/**
 * Ürün indirim listesi API response
 */
export interface ApiResponseProductDiscountList {
  success?: boolean;
  message?: string;
  data?: ProductDiscountDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Tek ürün indirim API response
 */
export interface ApiResponseProductDiscountDto {
  success?: boolean;
  message?: string;
  data?: ProductDiscountDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Ürün indirim oluşturma DTO
 */
export interface ProductDiscountCreateDto {
  discountName: string;
  discountType: ProductDiscountDtoDiscountType;
  discountValue?: number;
  minQuantity?: number;
  maxQuantity?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}

/**
 * Ürün indirim güncelleme DTO
 */
export interface ProductDiscountUpdateDto {
  discountName?: string;
  discountType?: ProductDiscountDtoDiscountType;
  discountValue?: number;
  minQuantity?: number;
  maxQuantity?: number;
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
}
