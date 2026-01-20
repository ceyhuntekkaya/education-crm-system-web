import { ProductVariantDto } from "../dto/supply";

/**
 * API Response types for Product Variants
 */

export interface ApiResponseProductVariantDto {
  success?: boolean;
  message?: string;
  data?: ProductVariantDto;
  errors?: string[];
  timestamp?: string;
  path?: string;
}

export interface ApiResponseListProductVariantDto {
  success?: boolean;
  message?: string;
  data?: ProductVariantDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}
