"use client";

import React, { createContext, useContext } from "react";
import {
  useWishlistData,
  useWishlistView,
  useWishlistSelection,
  useRFQFormModal,
} from "../hooks";
import { WishlistContextValue, WishlistProviderProps } from "../types";

/**
 * 💝 WISHLIST CONTEXT
 * Favori ürünler için context
 */

const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined
);

export function WishlistProvider({ children }: WishlistProviderProps) {
  // 🎨 VIEW MODE
  const { viewMode, setViewMode } = useWishlistView();

  // 📊 DATA
  const {
    wishlistLoading,
    error,
    refetchWishlist,
    wishlistItems,
    isEmpty,
    totalCount,
  } = useWishlistData();

  // 🎯 SELECTION MODE
  const {
    isSelectionMode,
    selectedProductIds,
    selectedCount,
    enableSelectionMode,
    disableSelectionMode,
    toggleProductSelection,
    clearSelection,
    selectAll,
    isProductSelected,
  } = useWishlistSelection({
    wishlistItems,
  });

  // 🎨 RFQ FORM MODAL
  const {
    isRFQModalOpen,
    openRFQModal,
    closeRFQModal,
    submitRFQ: createRFQ,
    isCreateLoadingRFQ,
  } = useRFQFormModal({
    disableSelectionMode,
  });

  // 🎯 CONTEXT VALUE
  const contextValue: WishlistContextValue = {
    viewMode,
    setViewMode,
    wishlistLoading,
    error,
    refetchWishlist,
    wishlistItems,
    isEmpty,
    totalCount,
    isSelectionMode,
    selectedProductIds,
    isCreateLoadingRFQ,
    selectedCount,
    enableSelectionMode,
    disableSelectionMode,
    toggleProductSelection,
    clearSelection,
    selectAll,
    isProductSelected,
    isRFQModalOpen,
    openRFQModal,
    closeRFQModal,
    submitRFQ: createRFQ,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error(
      "useWishlistContext must be used within a WishlistProvider"
    );
  }
  return context;
}

export default WishlistContext;
