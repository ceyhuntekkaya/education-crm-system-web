/**
 * Supply Supplier DTOs
 * Tedarikçi ile ilgili veri transfer objeleri
 */

import { PageableObject, SortObject } from "../../api/api-general.types";

/**
 * Tedarikçi bilgileri
 */
export interface SupplierDto {
  id?: number;
  companyName?: string;
  taxNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  description?: string;
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Sayfalama ile Tedarikçi Listesi
 */
export interface PageSupplierDto {
  totalElements?: number;
  totalPages?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  content?: SupplierDto[];
  number?: number;
  empty?: boolean;
}

/**
 * Tedarikçi API response (Sayfalı Liste)
 */
export interface ApiResponsePageSupplierDto {
  success?: boolean;
  message?: string;
  data?: PageSupplierDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Tedarikçi API response (Liste)
 */
export interface ApiResponseSupplierListDto {
  success?: boolean;
  message?: string;
  data?: {
    content: SupplierDto[];
  };
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Tedarikçi API response (Tekil)
 */
export interface ApiResponseSupplierDto {
  success?: boolean;
  message?: string;
  data?: SupplierDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Tedarikçileri getirme parametreleri
 */
export interface GetAllSuppliersParams {
  page?: number;
  size?: number;
  sort?: string;
  isActive?: boolean;
  searchQuery?: string;
}

/**
 * Tedarikçi Dashboard Özet İstatistikleri
 */
export interface SupplierSummaryDto {
  totalSales?: number;
  activeQuotations?: number;
  pendingQuotations?: number;
  submittedQuotations?: number;
  acceptedQuotations?: number;
  totalOrders?: number;
  pendingOrders?: number;
  completedOrders?: number;
  totalProducts?: number;
  activeProducts?: number;
  averageRating?: number;
  totalRatings?: number;
}

/**
 * Tedarikçi Dashboard API response
 */
export interface ApiResponseSupplierSummaryDto {
  success?: boolean;
  message?: string;
  data?: SupplierSummaryDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}
