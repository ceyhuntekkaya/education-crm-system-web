/**
 * Supply Supplier DTOs
 * Tedarikçi ile ilgili veri transfer objeleri
 */

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
 * Tedarikçi API response
 */
export interface ApiResponseSupplierDto {
  success?: boolean;
  message?: string;
  data?: SupplierDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}
