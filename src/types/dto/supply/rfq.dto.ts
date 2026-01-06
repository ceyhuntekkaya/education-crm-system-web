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
  submissionDeadline: string; // ISO 8601 - Zorunlu
  expectedDeliveryDate: string; // ISO 8601 - Zorunlu
  paymentTerms?: string;
  evaluationCriteria?: string;
  technicalRequirements?: string;
  productIds?: number[]; // Seçilen ürün ID'leri
}

/**
 * RFQ Update DTO - RFQ güncelleme
 * API: PUT /supply/rfqs/{id}
 */
export interface RFQUpdateDto {
  title?: string;
  description?: string;
  rfqType?: RFQType;
  submissionDeadline?: string; // ISO 8601
  expectedDeliveryDate: string; // ISO 8601 - Zorunlu
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

/**
 * API Response RFQ DTO
 * Tek bir RFQ için API response
 */
export interface ApiResponseRFQDto {
  success?: boolean;
  message?: string;
  data?: RFQDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
  status?: number;
}

/**
 * API Response Page RFQ DTO
 * Sayfalanmış RFQ listesi için API response
 */
export interface ApiResponsePageRFQDto {
  success?: boolean;
  message?: string;
  data?: PageRFQDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
  status?: number;
}

/**
 * Get RFQs by Company Params
 * Şirkete ait ilanları getirmek için parametreler
 */
export interface GetRFQsByCompanyParams extends Record<string, unknown> {
  page?: number;
  size?: number;
  sort?: string;
  status?: RFQStatus;
  rfqType?: RFQType;
  search?: string;
}

/**
 * RFQ Item DTO - Request for Quotation Item (İlan Kalemi) detayları
 * API: GET /supply/rfqs/{id}/items
 */
export interface RFQItemDto {
  id?: number;
  rfqId?: number;
  rfqTitle?: string;
  categoryId?: number;
  categoryName?: string;
  itemName?: string;
  specifications?: string;
  quantity?: number;
  unit?: string;
}

/**
 * RFQ Item Create DTO - Yeni RFQ Item oluşturma
 * API: POST /supply/rfqs/{id}/items
 */
export interface RFQItemCreateDto {
  categoryId?: number;
  itemName: string;
  specifications?: string;
  quantity: number;
  unit?: string;
}

/**
 * RFQ Item Update DTO - RFQ Item güncelleme
 * API: PUT /supply/rfqs/{id}/items/{itemId}
 */
export interface RFQItemUpdateDto {
  categoryId?: number;
  itemName?: string;
  specifications?: string;
  quantity?: number;
  unit?: string;
}

/**
 * API Response RFQ Item DTO
 * Tek bir RFQ Item için API response
 */
export interface ApiResponseRFQItemDto {
  success?: boolean;
  message?: string;
  data?: RFQItemDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
  status?: number;
}

/**
 * API Response List RFQ Item DTO
 * RFQ Item listesi için API response
 */
export interface ApiResponseListRFQItemDto {
  success?: boolean;
  message?: string;
  data?: RFQItemDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}
