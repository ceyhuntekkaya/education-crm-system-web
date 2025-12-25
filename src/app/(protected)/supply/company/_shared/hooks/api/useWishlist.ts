"use client";

import { useGet, usePost, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";

// Types
export interface WishlistDto {
  id?: number;
  userId?: number;
  productId?: number;
  productName?: string;
  productSku?: string;
  productMainImageUrl?: string;
  supplierCompanyName?: string;
  createdAt?: string;
}

export interface WishlistCreateDto {
  productId: number;
}

export interface WishlistCheckDto {
  isInWishlist?: boolean;
  wishlistId?: number;
}

/**
 * Kullanıcının wishlist'ini getirir
 *
 * @returns Wishlist listesi
 *
 * API Endpoint: GET /supply/wishlists
 */
export const useGetWishlist = (options?: { enabled?: boolean }) => {
  return useGet<ApiResponseDto<WishlistDto[]>>(
    API_ENDPOINTS.SUPPLY.WISHLISTS.LIST,
    options
  );
};

/**
 * Ürünün wishlist'te olup olmadığını kontrol eder
 *
 * @param productId - Kontrol edilecek ürün ID'si
 * @returns Check result
 *
 * API Endpoint: GET /supply/wishlists/check/{productId}
 */
export const useCheckProductInWishlist = (
  productId: number | null,
  options?: { enabled?: boolean }
) => {
  return useGet<ApiResponseDto<WishlistCheckDto>>(
    productId ? API_ENDPOINTS.SUPPLY.WISHLISTS.CHECK(productId) : null,
    options
  );
};

/**
 * Ürünü wishlist'e ekler
 *
 * @returns Mutation hook
 *
 * API Endpoint: POST /supply/wishlists
 */
export const useAddToWishlist = () => {
  return usePost<ApiResponseDto<WishlistDto>, WishlistCreateDto>(
    API_ENDPOINTS.SUPPLY.WISHLISTS.CREATE,
    {
      showSnackbar: false,
    }
  );
};

/**
 * Ürünü wishlist'ten çıkarır
 *
 * @returns Mutation hook
 *
 * API Endpoint: DELETE /supply/wishlists/{id}
 */
export const useRemoveFromWishlist = () => {
  return useDelete<ApiResponseDto<void>, number>(
    (id: number) => API_ENDPOINTS.SUPPLY.WISHLISTS.DELETE(id),
    {
      showSnackbar: false,
    }
  );
};
