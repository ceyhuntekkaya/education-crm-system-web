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
  currency?: string; // TRY, USD, EUR, GBP, SAR, AED, QAR, KWD, BHD
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
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED";

/**
 * Paginated Quotation Response
 * Sayfalanmış teklif listesi
 */
export interface PageQuotationDto {
  content?: QuotationDto[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number; // 0-indexed
  first?: boolean;
  last?: boolean;
}
