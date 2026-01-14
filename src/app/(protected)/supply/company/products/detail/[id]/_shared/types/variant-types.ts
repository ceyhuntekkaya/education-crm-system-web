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

export interface ApiResponseListProductVariantDto {
  success?: boolean;
  message?: string;
  data?: ProductVariantDto[];
  errors?: string[];
  timestamp?: string;
  path?: string;
}

export interface ProductVariantCardProps {
  variant: ProductVariantDto;
  showDetails?: boolean;
}

export interface ProductVariantsSectionProps {
  productId: number;
  className?: string;
}
