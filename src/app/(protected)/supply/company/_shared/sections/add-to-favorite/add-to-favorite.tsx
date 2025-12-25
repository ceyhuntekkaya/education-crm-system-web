"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useCheckProductInWishlist,
} from "../../hooks";
import { AddToFavoriteProps } from "./types";
import { Icon } from "@/components/ui/icon";
import { useSnackbar } from "@/contexts";

// ============================================================================
// CONSTANTS
// ============================================================================

const FAVORITE_LABELS = {
  add: "Favorilere Ekle",
  remove: "Favorilerden Çıkar",
} as const;

const ICON_NAMES = {
  // Favori: filled heart (ph-bold ph-fill ph-heart → Icon component'te ph ph-bold ph-fill ph-heart olur)
  favorite: "ph-bold ph-fill ph-heart",
  // Favori değil: outline heart (ph-bold ph-heart → Icon component'te ph ph-bold ph-heart olur)
  notFavorite: "ph-bold ph-heart",
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Favori durumuna göre Icon variant'ını belirler
 *
 * Favori durumunda her zaman kırmızı variant kullanılır (görünürlük için)
 * Favori değilken kullanıcının seçtiği variant kullanılır
 */
const getIconVariant = (
  variant: AddToFavoriteProps["variant"],
  isFavorite: boolean
):
  | "inline"
  | "outline"
  | "inline-danger"
  | "inline-success"
  | "inline-warning"
  | "outline-danger"
  | "outline-success"
  | "outline-warning" => {
  // Favori durumunda her zaman kırmızı variant kullan (görünürlük için)
  if (isFavorite) {
    // Eğer variant zaten danger variant'ı ise, onu kullan
    if (variant === "inline-danger" || variant === "outline-danger") {
      return variant;
    }
    // Değilse outline-danger kullan (daha görünür)
    return "outline-danger";
  }

  // Favori değilken kullanıcının seçtiği variant'ı kullan
  return variant || "inline";
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AddToFavorite Component
 *
 * Ürünleri favorilere ekleme/çıkarma işlemini yapan buton component'i.
 * Ürünün favori durumunu yönetir ve kullanıcıya görsel geri bildirim sağlar.
 *
 * @example
 * ```tsx
 * <AddToFavorite
 *   productId={123}
 *   initialIsFavorite={false}
 *   onFavoriteChange={(isFavorite) => console.log(isFavorite)}
 * />
 * ```
 */
export const AddToFavorite: React.FC<AddToFavoriteProps> = ({
  productId,
  wishlistId: initialWishlistId,
  initialIsFavorite = false,
  size = "md",
  variant = "inline",
  iconSize = 20,
  iconOnly = false,
  className = "",
  onFavoriteChange,
  disabled = false,
}) => {
  // ========================================================================
  // STATE
  // ========================================================================

  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [wishlistId, setWishlistId] = useState<number | undefined>(
    initialWishlistId
  );

  // ========================================================================
  // API HOOKS
  // ========================================================================

  const { showSnackbar } = useSnackbar();
  const { mutate: addToWishlist, loading: isAdding } = useAddToWishlist();
  const { mutate: removeFromWishlist, loading: isRemoving } =
    useRemoveFromWishlist();

  // Eğer initial değerler yoksa, API'den kontrol et
  const shouldCheckWishlist = !initialIsFavorite && !initialWishlistId;
  const { data: checkData, loading: isChecking } = useCheckProductInWishlist(
    shouldCheckWishlist ? productId : null,
    { enabled: shouldCheckWishlist }
  );

  // ========================================================================
  // DERIVED STATE
  // ========================================================================

  const isLoading = isAdding || isRemoving || isChecking;

  const buttonLabel = useMemo(
    () => (isFavorite ? FAVORITE_LABELS.remove : FAVORITE_LABELS.add),
    [isFavorite]
  );

  const iconName = useMemo(
    () => (isFavorite ? ICON_NAMES.favorite : ICON_NAMES.notFavorite),
    [isFavorite]
  );

  const iconVariant = useMemo(
    () => getIconVariant(variant, isFavorite),
    [variant, isFavorite]
  );

  // ========================================================================
  // EFFECTS
  // ========================================================================

  /**
   * API'den gelen favori kontrol sonucunu state'e aktarır
   */
  useEffect(() => {
    if (!checkData?.data) return;

    const { isInWishlist, wishlistId: apiWishlistId } = checkData.data;

    setIsFavorite(isInWishlist || false);
    if (apiWishlistId) {
      setWishlistId(apiWishlistId);
    }
  }, [checkData]);

  // ========================================================================
  // EVENT HANDLERS
  // ========================================================================

  /**
   * Favori durumunu toggle eder (ekle/çıkar)
   */
  const handleToggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading || disabled) return;

      // Favorilerden çıkar
      if (isFavorite && wishlistId) {
        removeFromWishlist(wishlistId, {
          onSuccess: () => {
            setIsFavorite(false);
            setWishlistId(undefined);
            showSnackbar("Ürün favorilerden kaldırıldı", "error");
            onFavoriteChange?.(false, undefined);
          },
        });
        return;
      }

      // Favorilere ekle
      addToWishlist(
        { productId },
        {
          onSuccess: (data) => {
            setIsFavorite(true);
            const newWishlistId = data?.data?.id;
            if (newWishlistId) {
              setWishlistId(newWishlistId);
            }
            showSnackbar("Ürün favorilere eklendi", "success");
            onFavoriteChange?.(true, newWishlistId);
          },
        }
      );
    },
    [
      isFavorite,
      wishlistId,
      isLoading,
      disabled,
      productId,
      addToWishlist,
      removeFromWishlist,
      showSnackbar,
      onFavoriteChange,
    ]
  );

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div
      className="d-inline-block"
      style={{ width: "auto", maxWidth: "fit-content" }}
    >
      <Icon
        icon={iconName}
        variant={iconVariant}
        size={size}
        onClick={handleToggleFavorite}
        disabled={disabled}
        loading={isLoading}
        hoverText={iconOnly ? undefined : buttonLabel}
        className={className}
        aria-label={buttonLabel}
        animate={false}
      />
    </div>
  );
};

export default AddToFavorite;
