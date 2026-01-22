import { PageableObject, SortObject } from "../../api/api-general.types";

// ================== QUOTATION ==================

/**
 * Quotation DTO - Teklif detayları
 * API: GET /supply/quotations/by-company/{companyId}
 * API: GET /supply/quotations
 */
export interface QuotationDto {
  id?: number;
  rfqId?: number;
  rfqTitle?: string;
  supplierId?: number;
  supplierCompanyName?: string;
  averageRating?: number;
  status?: QuotationStatus;
  totalAmount?: number;
  currency?: QuotationCurrency;
  validUntil?: string; // ISO 8601
  deliveryDays?: number;
  paymentTerms?: string;
  warrantyTerms?: string;
  notes?: string;
  versionNumber?: number;
  createdAt?: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  itemCount?: number;
}

/**
 * Quotation Status Enum
 */
export type QuotationStatus =
  (typeof QuotationStatus)[keyof typeof QuotationStatus];

export const QuotationStatus = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  UNDER_REVIEW: "UNDER_REVIEW",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
} as const;

/**
 * Quotation Currency Enum
 */
export type QuotationCurrency =
  (typeof QuotationCurrency)[keyof typeof QuotationCurrency];

export const QuotationCurrency = {
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

// ================== PAGINATED RESPONSE ==================

/**
 * Paginated Quotation Response
 * Sayfalanmış teklif listesi
 */
export interface PageQuotationDto {
  totalElements?: number;
  totalPages?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  content?: QuotationDto[];
  number?: number; // 0-indexed
  empty?: boolean;
}

/**
 * API Response wrapper for PageQuotationDto
 */
export interface ApiResponsePageQuotationDto {
  success?: boolean;
  message?: string;
  data?: PageQuotationDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

// ================== API PARAMS ==================

/**
 * Parameters for fetching quotations by company
 */
export interface GetQuotationsByCompanyParams extends Record<string, unknown> {
  /**
   * Page number
   */
  page?: number;
  /**
   * Page size
   */
  size?: number;
}

// ================== CREATE & UPDATE DTOs ==================

/**
 * Quotation Create DTO - Yeni teklif oluşturma
 * API: POST /supply/quotations
 */
export interface QuotationCreateDto {
  rfqId: number;
  supplierId: number;
  totalAmount?: number;
  currency?: QuotationCreateDtoCurrency;
  validUntil?: string;
  deliveryDays?: number;
  paymentTerms?: string;
  warrantyTerms?: string;
  notes?: string;
}

export type QuotationCreateDtoCurrency =
  (typeof QuotationCreateDtoCurrency)[keyof typeof QuotationCreateDtoCurrency];

export const QuotationCreateDtoCurrency = {
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

/**
 * Quotation Update DTO - Teklif güncelleme
 * API: PUT /supply/quotations/{id}
 */
export interface QuotationUpdateDto {
  totalAmount?: number;
  currency?: QuotationUpdateDtoCurrency;
  validUntil?: string;
  deliveryDays?: number;
  paymentTerms?: string;
  warrantyTerms?: string;
  notes?: string;
}

export type QuotationUpdateDtoCurrency =
  (typeof QuotationUpdateDtoCurrency)[keyof typeof QuotationUpdateDtoCurrency];

export const QuotationUpdateDtoCurrency = {
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

/**
 * API Response wrapper for single QuotationDto
 */
export interface ApiResponseQuotationDto {
  success?: boolean;
  message?: string;
  data?: QuotationDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

// ================== QUOTATION COMPARISON ==================
// Moved from types/supply/quotation.ts

export interface ApiResponseListQuotationComparisonDto {
  success?: boolean;
  message?: string;
  data?: QuotationComparisonDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}

export interface QuotationComparisonDto {
  quotationId?: number;
  supplierId?: number;
  supplierCompanyName?: string;
  averageRating?: number;
  status?: QuotationComparisonDtoStatus;
  totalAmount?: number;
  currency?: QuotationComparisonDtoCurrency;
  validUntil?: string;
  deliveryDays?: number;
  paymentTerms?: string;
  warrantyTerms?: string;
  notes?: string;
  versionNumber?: number;
  createdAt?: string;
  updatedAt?: string;
  items?: QuotationItemComparisonDto[];
}

export type QuotationComparisonDtoStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED";

export type QuotationComparisonDtoCurrency =
  | "TRY"
  | "USD"
  | "EUR"
  | "GBP"
  | "CHF"
  | "CAD"
  | "AUD"
  | "JPY"
  | "CNY"
  | "RUB"
  | "SAR"
  | "AED"
  | "QAR"
  | "KWD"
  | "BHD";

export interface QuotationItemComparisonDto {
  rfqItemId?: number;
  itemName?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  discountAmount?: number;
  totalPrice?: number;
}

// ================== QUOTATION ITEMS ==================

/**
 * Quotation Item DTO - Teklif kalemi detayları
 * API: GET /supply/quotations/{id}/items
 */
export interface QuotationItemDto {
  id?: number;
  quotationId?: number;
  rfqItemId?: number;
  itemName?: string;
  specifications?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  discountAmount?: number;
  totalPrice?: number;
  deliveryDays?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Quotation Item Create DTO - Yeni teklif kalemi oluşturma
 * API: POST /supply/quotations/{id}/items
 */
export interface QuotationItemCreateDto {
  rfqItemId: number;
  itemName: string;
  specifications?: string;
  quantity: number;
  unit?: string;
  unitPrice: number;
  discountAmount?: number;
  deliveryDays?: number;
  notes?: string;
}

/**
 * Quotation Item Update DTO - Teklif kalemi güncelleme
 * API: PUT /supply/quotations/{id}/items/{itemId}
 */
export interface QuotationItemUpdateDto {
  itemName?: string;
  specifications?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  discountAmount?: number;
  deliveryDays?: number;
  notes?: string;
}

/**
 * API Response Quotation Item DTO
 * Tek bir Quotation Item için API response
 */
export interface ApiResponseQuotationItemDto {
  success?: boolean;
  message?: string;
  data?: QuotationItemDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
  status?: number;
}

/**
 * API Response List Quotation Item DTO
 * Quotation Item listesi için API response
 */
export interface ApiResponseListQuotationItemDto {
  success?: boolean;
  message?: string;
  data?: QuotationItemDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
  status?: number;
}
