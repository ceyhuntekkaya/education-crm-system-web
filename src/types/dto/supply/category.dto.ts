/**
 * Supply Category DTOs
 * Kategori ile ilgili veri transfer objeleri
 */

/**
 * Kategori bilgileri
 */
export interface CategoryDto {
  id?: number;
  name?: string;
  description?: string;
  parentId?: number;
  parentName?: string;
  isActive?: boolean;
  displayOrder?: number;
  createdAt?: string;
  subCategoryCount?: number;
  subCategories?: unknown[];
}

/**
 * Kategori API response
 */
export interface ApiResponseCategoryDto {
  success?: boolean;
  message?: string;
  data?: CategoryDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}
