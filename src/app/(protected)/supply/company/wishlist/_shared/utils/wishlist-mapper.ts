import type { WishlistDto } from "../hooks/api/useWishlistApi";
import { ProductResultDto } from "@/app/(protected)/supply/company/products/_shared/types";

/**
 * WishlistDto'yu ProductResultDto'ya dönüştürür
 * ProductCard componentinin kullanabileceği formata çevirir
 *
 * @param wishlistItem - Wishlist item DTO
 * @returns ProductResultDto
 */
export const mapWishlistToProduct = (
  wishlistItem: WishlistDto
): ProductResultDto => {
  return {
    id: wishlistItem.productId,
    name: wishlistItem.productName,
    sku: wishlistItem.productSku,
    mainImageUrl: wishlistItem.productMainImageUrl,
    supplierName: wishlistItem.supplierCompanyName,
    // Diğer alanlar wishlist'te olmadığı için default değerler
    status: "ACTIVE", // Wishlist'te olan ürünler genelde aktif
    createdAt: wishlistItem.createdAt,
  };
};

/**
 * WishlistDto array'ini ProductResultDto array'ine dönüştürür
 *
 * @param wishlistItems - Wishlist items array
 * @returns ProductResultDto array
 */
export const mapWishlistsToProducts = (
  wishlistItems: WishlistDto[]
): ProductResultDto[] => {
  return wishlistItems.map(mapWishlistToProduct);
};
