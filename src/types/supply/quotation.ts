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
