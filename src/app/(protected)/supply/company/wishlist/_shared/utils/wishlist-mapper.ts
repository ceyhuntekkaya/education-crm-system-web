import type { WishlistDto } from "../hooks/api/useWishlistApi";
import {
  ProductResultDto,
  ProductDtoStatus,
} from "@/types/dto/supply/product.dto";

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
    id: wishlistItem.id,
    name: wishlistItem.name,
    sku: wishlistItem.sku,
    mainImageUrl: wishlistItem.mainImageUrl,
    supplierName: wishlistItem.supplierCompanyName,
    categoryId: wishlistItem.categoryId,
    categoryName: wishlistItem.categoryName,
    supplierId: wishlistItem.supplierId,
    unitPrice: wishlistItem.basePrice,
    currency: wishlistItem.currency,
    taxRate: wishlistItem.taxRate,
    stockTrackingType: wishlistItem.stockTrackingType,
    currentStock: wishlistItem.stockQuantity,
    minStockLevel: wishlistItem.minStockLevel,
    status: wishlistItem.status as ProductDtoStatus | undefined,
    deliveryDays: wishlistItem.deliveryDays,
    createdAt: wishlistItem.createdAt,
    updatedAt: wishlistItem.updatedAt,
    description: wishlistItem.description,
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
