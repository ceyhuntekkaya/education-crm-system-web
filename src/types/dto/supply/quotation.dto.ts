// ================== SORT & PAGEABLE ==================

export interface SortObject {
  empty?: boolean;
  sorted?: boolean;
  unsorted?: boolean;
}

export interface PageableObject {
  offset?: number;
  sort?: SortObject;
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  unpaged?: boolean;
}

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
