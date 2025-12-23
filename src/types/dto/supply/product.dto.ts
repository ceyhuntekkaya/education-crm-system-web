import { PageableObject, SortObject } from "../../api/api-general.types";

/**
 * Supply Product DTOs
 * Ürün ile ilgili veri transfer objeleri
 */

/**
 * Ürün durumu enum
 */
export const ProductDtoStatus = {
  ACTIVE: "ACTIVE",
  PASSIVE: "PASSIVE",
  OUT_OF_STOCK: "OUT_OF_STOCK",
  DISCONTINUED: "DISCONTINUED",
} as const;

export type ProductDtoStatus =
  (typeof ProductDtoStatus)[keyof typeof ProductDtoStatus];

/**
 * Stok takip tipi enum
 */
export const ProductDtoStockTrackingType = {
  UNLIMITED: "UNLIMITED",
  LIMITED: "LIMITED",
} as const;

export type ProductDtoStockTrackingType =
  (typeof ProductDtoStockTrackingType)[keyof typeof ProductDtoStockTrackingType];

/**
 * Para birimi enum
 */
export const ProductDtoCurrency = {
  TRY: "TRY",
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  CHF: "CHF",
  CAD: "CAD",
  AUD: "AUD",
  JPY: "JPY",
  CNY: "CNY",
  RUB: "RUB",
  SAR: "SAR",
  AED: "AED",
  QAR: "QAR",
  KWD: "KWD",
  BHD: "BHD",
} as const;

export type ProductDtoCurrency =
  (typeof ProductDtoCurrency)[keyof typeof ProductDtoCurrency];

/**
 * Ürün detay bilgileri
 */
export interface ProductDto {
  id?: number;
  supplierId?: number;
  supplierCompanyName?: string;
  categoryId?: number;
  categoryName?: string;
  name?: string;
  sku?: string;
  description?: string;
  technicalSpecs?: string;
  status?: ProductDtoStatus;
  stockTrackingType?: ProductDtoStockTrackingType;
  stockQuantity?: number;
  minStockLevel?: number;
  basePrice?: number;
  currency?: ProductDtoCurrency;
  taxRate?: number;
  minOrderQuantity?: number;
  deliveryDays?: number;
  mainImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Sayfalanmış ürün listesi
 */
export interface PageProductDto {
  totalElements?: number;
  totalPages?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  content?: ProductDto[];
  number?: number;
  empty?: boolean;
}

/**
 * Ürün arama API response
 */
export interface ApiResponsePageProductDto {
  success?: boolean;
  message?: string;
  data?: PageProductDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}
