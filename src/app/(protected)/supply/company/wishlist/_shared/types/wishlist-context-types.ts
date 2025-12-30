import { WishlistDto, RFQCreateDto } from "../hooks/api";
import { ApiResponseDto } from "@/types";
import { RFQDto } from "@/types/dto/supply/rfq.dto";
import { MutationOptions } from "@/hooks/api/types";

/**
 * Wishlist Context State tipi
 */
export interface WishlistContextState {
  wishlistItems: WishlistDto[];
  wishlistLoading: boolean;
  error: Error | null;
  viewMode: "grid" | "list";
  // Selection mode states
  isSelectionMode: boolean;
  selectedProductIds: number[];
  isCreateLoadingRFQ: boolean;
  // RFQ modal state
  isRFQModalOpen: boolean;
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

  // RFQ modal actions
  isRFQModalOpen: boolean;
  openRFQModal: () => void;
  closeRFQModal: () => void;
  submitRFQ: (
    data: RFQCreateDto,
    mutationOptions?: MutationOptions<ApiResponseDto<RFQDto>, RFQCreateDto>
  ) => Promise<ApiResponseDto<RFQDto> | null>;

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
