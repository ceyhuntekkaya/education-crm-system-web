/**
 * RFQ DTO - Request for Quotation (İlan) detayları
 * API: GET /supply/rfqs/by-company/{companyId}
 * API: GET /supply/rfqs
 */
export interface RFQDto {
  id?: number;
  companyId?: number;
  companyName?: string;
  title?: string;
  description?: string;
  rfqType?: RFQType; // OPEN, INVITED
  status?: RFQStatus; // DRAFT, PUBLISHED, CLOSED, CANCELLED
  submissionDeadline?: string; // ISO 8601
  expectedDeliveryDate?: string; // ISO 8601
  paymentTerms?: string;
  evaluationCriteria?: string;
  technicalRequirements?: string;
  createdAt?: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  itemCount?: number;
  quotationCount?: number;
  invitationCount?: number;
}

/**
 * RFQ Status Enum
 */
export type RFQStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "CANCELLED";

/**
 * RFQ Type Enum
 */
export type RFQType = "OPEN" | "INVITED";

/**
 * RFQ Create DTO - Yeni RFQ oluşturma
 * API: POST /supply/rfqs
 */
export interface RFQCreateDto {
  companyId: number;
  title: string;
  description?: string;
  rfqType?: RFQType;
  submissionDeadline: string; // ISO 8601
  expectedDeliveryDate?: string; // ISO 8601
  paymentTerms?: string;
  evaluationCriteria?: string;
  technicalRequirements?: string;
  productIds?: number[]; // Seçilen ürün ID'leri
}

/**
 * Paginated RFQ Response
 * Sayfalanmış ilan listesi
 */
export interface PageRFQDto {
  content?: RFQDto[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number; // 0-indexed
  first?: boolean;
  last?: boolean;
}
