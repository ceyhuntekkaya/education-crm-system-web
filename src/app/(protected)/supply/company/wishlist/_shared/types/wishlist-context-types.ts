import { WishlistDto } from "../hooks/api";

/**
 * Wishlist Context State tipi
 */
export interface WishlistContextState {
  wishlistItems: WishlistDto[];
  loading: boolean;
  error: Error | null;
  viewMode: "grid" | "list";
  // Selection mode states
  isSelectionMode: boolean;
  selectedProductIds: number[];
  isSubmitting: boolean;
}

/**
 * Wishlist Context Value tipi
 */
export interface WishlistContextValue extends WishlistContextState {
  // Actions
  refetchWishlist: () => void;
  setViewMode: (mode: "grid" | "list") => void;

  // Selection mode actions
  enableSelectionMode: () => void;
  disableSelectionMode: () => void;
  toggleProductSelection: (productId: number) => void;
  clearSelection: () => void;
  selectAll: () => void;
  submitToProposal: () => Promise<void>;

  // Computed values
  isEmpty: boolean;
  totalCount: number;
  selectedCount: number;
  isProductSelected: (productId: number) => boolean;
}

/**
 * Wishlist Provider Props tipi
 */
export interface WishlistProviderProps {
  children: React.ReactNode;
}
