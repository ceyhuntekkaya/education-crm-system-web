import { WishlistDto } from "../hooks/api";

/**
 * Wishlist Context Value tipi
 * DataCollectionLayout kullanıldığı için sadece data ile ilgili state'leri tutar
 */
export interface WishlistContextValue {
  // Data state
  wishlistItems: WishlistDto[];
  wishlistLoading: boolean;
  error: Error | null;

  // Actions
  refetchWishlist: () => void;

  // Computed values
  isEmpty: boolean;
  totalCount: number;
}

/**
 * Wishlist Provider Props tipi
 */
export interface WishlistProviderProps {
  children: React.ReactNode;
}
