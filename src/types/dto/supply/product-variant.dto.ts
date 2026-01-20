/**
 * Product Variant DTO
 */
export interface ProductVariantDto {
  id?: number;
  productId?: number;
  productName?: string;
  variantName?: string;
  sku?: string;
  priceAdjustment?: number;
  stockQuantity?: number;
  isActive?: boolean;
}

/**
 * Product Variant Create DTO
 */
export interface ProductVariantCreateDto {
  /** @minLength 1 */
  variantName: string;
  sku?: string;
  priceAdjustment?: number;
  stockQuantity?: number;
  isActive?: boolean;
}

/**
 * Product Variant Update DTO
 */
export interface ProductVariantUpdateDto {
  variantName?: string;
  sku?: string;
  priceAdjustment?: number;
  stockQuantity?: number;
  isActive?: boolean;
}
