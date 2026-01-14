import { PageableObject, SortObject } from "../../api/api-general.types";

/**
 * Supply Product DTOs
 * Ürün ile ilgili veri transfer objeleri
 */

/**
 * Ürün arama durumu enum
 */
export type SearchProductsStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "OUT_OF_STOCK"
  | "DISCONTINUED";

export const SearchProductsStatus = {
  ACTIVE: "ACTIVE" as const,
  INACTIVE: "INACTIVE" as const,
  OUT_OF_STOCK: "OUT_OF_STOCK" as const,
  DISCONTINUED: "DISCONTINUED" as const,
};

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
 * Ürün sonucu DTO tipi (UI için optimize edilmiş)
 * ProductDto'dan map edilir
 */
export interface ProductResultDto {
  id?: number;
  name?: string;
  description?: string;
  sku?: string;
  categoryId?: number;
  categoryName?: string;
  supplierId?: number;
  supplierName?: string; // ProductDto'da supplierCompanyName
  unitPrice?: number; // ProductDto'da basePrice
  currency?: string;
  taxRate?: number;
  stockTrackingType?: string;
  currentStock?: number; // ProductDto'da stockQuantity
  minStockLevel?: number;
  mainImageUrl?: string; // ProductDto'da mainImageUrl
  status?: ProductDtoStatus;
  deliveryDays?: number; // ProductDto'da deliveryDays
  createdAt?: string;
  updatedAt?: string;
}

/**
 * ProductDto'yu ProductResultDto'ya map eder (Backend response'una uygun)
 */
export function mapProductDtoToResult(dto: ProductDto): ProductResultDto {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    sku: dto.sku,
    categoryId: dto.categoryId,
    categoryName: dto.categoryName,
    supplierId: dto.supplierId,
    supplierName: dto.supplierCompanyName, // Backend field name
    unitPrice: dto.basePrice, // Backend field name
    currency: dto.currency,
    taxRate: dto.taxRate,
    stockTrackingType: dto.stockTrackingType,
    currentStock: dto.stockQuantity, // Backend field name
    minStockLevel: dto.minStockLevel,
    mainImageUrl: dto.mainImageUrl, // Backend field name
    status: dto.status as ProductDtoStatus,
    deliveryDays: dto.deliveryDays,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

/**
 * Ürün arama parametreleri
 */
export interface SearchProductsParams {
  searchTerm?: string;
  categoryId?: number;
  supplierId?: number;
  status?: SearchProductsStatus;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
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
