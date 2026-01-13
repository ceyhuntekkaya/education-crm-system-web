/**
 * Supply Category DTOs
 * Kategori ile ilgili veri transfer objeleri
 */

import { PageableObject, SortObject } from "../../api/api-general.types";

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
  data?: {
    content: CategoryDto[];
    totalElements?: number;
    totalPages?: number;
    size?: number;
    number?: number;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    empty?: boolean;
  };
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Sayfalanmış kategori listesi
 */
export interface PageCategoryDto {
  totalElements?: number;
  totalPages?: number;
  sort?: SortObject;
  first?: boolean;
  last?: boolean;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  content?: CategoryDto[];
  number?: number;
  empty?: boolean;
}

/**
 * Sayfalanmış kategori listesi API response
 */
export interface ApiResponsePageCategoryDto {
  success?: boolean;
  message?: string;
  data?: PageCategoryDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

/**
 * Kategori listesi parametreleri
 */
export interface GetAllCategoriesParams extends Record<string, unknown> {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  parentId?: number;
  isActive?: boolean;
}
