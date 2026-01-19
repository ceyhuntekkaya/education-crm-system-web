// Teklif karşılaştırma types

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
  (typeof QuotationComparisonDtoStatus)[keyof typeof QuotationComparisonDtoStatus];

export const QuotationComparisonDtoStatus = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  UNDER_REVIEW: "UNDER_REVIEW",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  EXPIRED: "EXPIRED",
} as const;

export type QuotationComparisonDtoCurrency =
  (typeof QuotationComparisonDtoCurrency)[keyof typeof QuotationComparisonDtoCurrency];

export const QuotationComparisonDtoCurrency = {
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

export interface QuotationItemComparisonDto {
  rfqItemId?: number;
  itemName?: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  discountAmount?: number;
  totalPrice?: number;
}

export interface ApiResponseListQuotationComparisonDto {
  success?: boolean;
  message?: string;
  data?: QuotationComparisonDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}

// Comparison view mode
export type ComparisonViewMode = "table" | "cards";

// Status display helpers
export interface StatusConfig {
  label: string;
  className: string;
  icon: string;
}

export const COMPARISON_STATUS_CONFIG: Record<
  QuotationComparisonDtoStatus,
  StatusConfig
> = {
  DRAFT: {
    label: "Taslak",
    className: "status--draft",
    icon: "ph ph-file-dashed",
  },
  SUBMITTED: {
    label: "Gönderildi",
    className: "status--submitted",
    icon: "ph ph-paper-plane-tilt",
  },
  UNDER_REVIEW: {
    label: "İnceleniyor",
    className: "status--review",
    icon: "ph ph-magnifying-glass",
  },
  ACCEPTED: {
    label: "Kabul Edildi",
    className: "status--accepted",
    icon: "ph ph-check-circle",
  },
  REJECTED: {
    label: "Reddedildi",
    className: "status--rejected",
    icon: "ph ph-x-circle",
  },
  EXPIRED: {
    label: "Süresi Doldu",
    className: "status--expired",
    icon: "ph ph-clock",
  },
};

// Currency display helpers
export const CURRENCY_SYMBOLS: Record<QuotationComparisonDtoCurrency, string> =
  {
    TRY: "₺",
    USD: "$",
    EUR: "€",
    GBP: "£",
    CHF: "Fr",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
    CNY: "¥",
    RUB: "₽",
    SAR: "﷼",
    AED: "د.إ",
    QAR: "﷼",
    KWD: "د.ك",
    BHD: ".د.ب",
  };

// ============== COMPARISON CONTEXT TYPES ==============

/**
 * Comparison Context State Interface
 */
export interface ComparisonContextState {
  // Data
  comparisons: QuotationComparisonDto[];
  isLoading: boolean;
  error: string | null;

  // View mode
  viewMode: ComparisonViewMode;

  // Selected comparison
  selectedComparison: QuotationComparisonDto | null;

  // RFQ ID
  rfqId: number;
}

/**
 * Comparison Context Actions Interface
 */
export interface ComparisonContextActions {
  // View mode
  setViewMode: (mode: ComparisonViewMode) => void;

  // Selection
  selectComparison: (comparison: QuotationComparisonDto | null) => void;

  // Refresh
  refetchComparisons: () => void;
}

/**
 * Complete Comparison Context Interface
 */
export interface ComparisonContextType
  extends ComparisonContextState,
    ComparisonContextActions {}
