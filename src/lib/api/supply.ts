import { apiClient } from "./client";
import {
  ProductVariantDto,
  ProductVariantCreateDto,
  ProductVariantUpdateDto,
  ApiResponseProductVariantDto,
  ApiResponseListProductVariantDto,
  ApiResponseVoid,
} from "@/types";

/**
 * Supply API fonksiyonları
 */

// ==========================================
// PRODUCT VARIANTS
// ==========================================

/**
 * Ürün varyantlarını listele
 */
export const getProductVariants = async (
  productId: number,
  signal?: AbortSignal,
): Promise<ApiResponseListProductVariantDto> => {
  const response = await apiClient.get<ApiResponseListProductVariantDto>(
    `/supply/products/${productId}/variants`,
    { signal },
  );
  return response.data;
};

/**
 * Yeni ürün varyantı oluştur
 */
export const createProductVariant = async (
  productId: number,
  data: ProductVariantCreateDto,
  signal?: AbortSignal,
): Promise<ApiResponseProductVariantDto> => {
  const response = await apiClient.post<ApiResponseProductVariantDto>(
    `/supply/products/${productId}/variants`,
    data,
    { signal },
  );
  return response.data;
};

/**
 * Ürün varyantını güncelle
 */
export const updateProductVariant = async (
  productId: number,
  variantId: number,
  data: ProductVariantUpdateDto,
): Promise<ApiResponseProductVariantDto> => {
  const response = await apiClient.put<ApiResponseProductVariantDto>(
    `/supply/products/${productId}/variants/${variantId}`,
    data,
  );
  return response.data;
};

/**
 * Ürün varyantını sil
 */
export const deleteProductVariant = async (
  productId: number,
  variantId: number,
): Promise<ApiResponseVoid> => {
  const response = await apiClient.delete<ApiResponseVoid>(
    `/supply/products/${productId}/variants/${variantId}`,
  );
  return response.data;
};
