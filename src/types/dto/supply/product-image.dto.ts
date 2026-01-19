/**
 * Product Image DTOs
 */

export interface ProductImageDto {
  id?: number;
  productId?: number;
  imageUrl?: string;
  displayOrder?: number;
  createdAt?: string;
}

export interface ProductImageCreateDto {
  /** @minLength 1 */
  imageUrl: string;
  displayOrder?: number;
}

export interface ApiResponseProductImageDto {
  success?: boolean;
  message?: string;
  data?: ProductImageDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

export interface ApiResponseListProductImageDto {
  success?: boolean;
  message?: string;
  data?: ProductImageDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}
