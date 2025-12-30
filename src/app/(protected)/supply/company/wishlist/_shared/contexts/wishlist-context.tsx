"use client";

import React, { createContext, useContext } from "react";
import { useSnackbar } from "@/contexts";
import {
  useWishlistData,
  useWishlistView,
  useWishlistSelection,
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
  const { showSnackbar } = useSnackbar();

  // 🎨 VIEW MODE
  const { viewMode, setViewMode } = useWishlistView();

  // 📊 DATA
  const {
    loading,
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
    isSubmitting,
    selectedCount,
    enableSelectionMode,
    disableSelectionMode,
    toggleProductSelection,
    clearSelection,
    selectAll,
    isProductSelected,
    submitToProposal,
  } = useWishlistSelection({
    wishlistItems,
    showSnackbar,
  });

  // 🎯 CONTEXT VALUE
  const contextValue: WishlistContextValue = {
    viewMode,
    setViewMode,
    loading,
    error,
    refetchWishlist,
    wishlistItems,
    isEmpty,
    totalCount,
    isSelectionMode,
    selectedProductIds,
    isSubmitting,
    selectedCount,
    enableSelectionMode,
    disableSelectionMode,
    toggleProductSelection,
    clearSelection,
    selectAll,
    isProductSelected,
    submitToProposal,
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
