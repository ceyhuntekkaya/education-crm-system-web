import { WishlistDto } from "../hooks/api";

/**
 * Wishlist Context State tipi
 */
export interface WishlistContextState {
  wishlistItems: WishlistDto[];
  loading: boolean;
  error: Error | null;
  viewMode: "grid" | "list";
}

/**
 * Wishlist Context Value tipi
 */
export interface WishlistContextValue extends WishlistContextState {
  // Actions
  refetchWishlist: () => void;
  setViewMode: (mode: "grid" | "list") => void;

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
