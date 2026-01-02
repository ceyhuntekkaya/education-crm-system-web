"use client";

import { useState, useCallback, useMemo } from "react";
import { WishlistDto } from "./api";

interface UseWishlistSelectionProps {
  wishlistItems: WishlistDto[];
}

export const useWishlistSelection = ({
  wishlistItems,
}: UseWishlistSelectionProps) => {
  // 🎯 SELECTION STATE
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

  // 🎯 COMPUTED VALUES
  const selectedCount = useMemo(
    () => selectedProductIds.length,
    [selectedProductIds]
  );

  // 🎯 SELECTION MODE FUNCTIONS
  const enableSelectionMode = useCallback(() => {
    setIsSelectionMode(true);
    setSelectedProductIds([]);
  }, []);

  const disableSelectionMode = useCallback(() => {
    setIsSelectionMode(false);
    setSelectedProductIds([]);
  }, []);

  const toggleProductSelection = useCallback((productId: number) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedProductIds([]);
  }, []);

  const selectAll = useCallback(() => {
    const allProductIds = wishlistItems
      .map((item) => item.productId)
      .filter((id): id is number => id !== undefined);
    setSelectedProductIds(allProductIds);
  }, [wishlistItems]);

  const isProductSelected = useCallback(
    (productId: number) => selectedProductIds.includes(productId),
    [selectedProductIds]
  );

  return {
    // State
    isSelectionMode,
    selectedProductIds,
    selectedCount,

    // Actions
    enableSelectionMode,
    disableSelectionMode,
    toggleProductSelection,
    clearSelection,
    selectAll,
    isProductSelected,
  };
};
