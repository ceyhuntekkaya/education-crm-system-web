"use client";

import { useState, useCallback, useMemo } from "react";
import { WishlistDto, useAddToProposal } from "./api";

interface UseWishlistSelectionProps {
  wishlistItems: WishlistDto[];
  showSnackbar: (
    message: string,
    type: "success" | "error" | "warning"
  ) => void;
}

export const useWishlistSelection = ({
  wishlistItems,
  showSnackbar,
}: UseWishlistSelectionProps) => {
  // 🎯 API HOOK
  const { mutate: addToProposal } = useAddToProposal();

  // 🎯 SELECTION STATE
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const submitToProposal = useCallback(async () => {
    if (selectedProductIds.length === 0) {
      showSnackbar("Lütfen en az bir ürün seçin", "warning");
      return;
    }

    try {
      setIsSubmitting(true);

      // API'ye istek at
      await addToProposal({
        productIds: selectedProductIds,
      });

      // Başarılı ise seçim modunu kapat
      disableSelectionMode();
    } catch (error) {
      console.error("Error submitting to proposal:", error);
      showSnackbar("RFQ oluşturulurken bir hata oluştu", "error");
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedProductIds, showSnackbar, disableSelectionMode, addToProposal]);

  return {
    // State
    isSelectionMode,
    selectedProductIds,
    isSubmitting,
    selectedCount,

    // Actions
    enableSelectionMode,
    disableSelectionMode,
    toggleProductSelection,
    clearSelection,
    selectAll,
    isProductSelected,
    submitToProposal,
  };
};
