"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useCheckProductInWishlist,
} from "../../hooks";
import { AddToFavoriteProps } from "./types";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useSnackbar } from "@/contexts";

// ============================================================================
// CONSTANTS
// ============================================================================

const FAVORITE_LABELS = {
  add: "Kaydet",
  remove: "Kaldır",
} as const;

const ICON_NAMES = {
  // İstek listesinde: filled bookmark (ph-bold ph-fill ph-bookmark → Icon component'te ph ph-bold ph-fill ph-bookmark olur)
  favorite: "ph-bold ph-fill ph-bookmark",
  // İstek listesinde değil: outline bookmark (ph-bold ph-bookmark → Icon component'te ph ph-bold ph-bookmark olur)
  notFavorite: "ph-bold ph-bookmark",
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * İstek listesi durumuna göre Icon variant'ını belirler
 *
 * İstek listesinde mavi tonlar kullanılır (görünürlük için)
 * İstek listesinde değilken kullanıcının seçtiği variant kullanılır
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
  // İstek listesindeyken mavi renk, hover'da danger rengi (kaldırma için)
  if (isFavorite) {
    // Eğer variant zaten outline ise, onu kullan
    if (variant === "outline") {
      return variant;
    }
    // Değilse outline kullan (mavi renk)
    return "outline";
  }

  // İstek listesinde değilken kullanıcının seçtiği variant'ı kullan
  return variant || "inline";
};

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * AddToFavorite Component
 *
 * Ürünleri istek listesine ekleme/çıkarma işlemini yapan buton component'i.
 * Ürünün istek listesi durumunu yönetir ve kullanıcıya görsel geri bildirim sağlar.
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
  type = "icon",
  size = "md",
  variant = "inline",
  iconPixelSize = 20,
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
   * API'den gelen istek listesi kontrol sonucunu state'e aktarır
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
   * İstek listesi durumunu toggle eder (ekle/çıkar)
   */
  const handleToggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (isLoading || disabled) return;

      // İstek listesinden çıkar
      if (isFavorite && wishlistId) {
        removeFromWishlist(wishlistId, {
          onSuccess: () => {
            setIsFavorite(false);
            setWishlistId(undefined);
            // showSnackbar("Ürün istek listesinden kaldırıldı", "error");
            onFavoriteChange?.(false, undefined);
          },
        });
        return;
      }

      // İstek listesine ekle
      addToWishlist(
        { productId },
        {
          onSuccess: (data) => {
            setIsFavorite(true);
            const newWishlistId = data?.data?.id;
            if (newWishlistId) {
              setWishlistId(newWishlistId);
            }
            // showSnackbar("Ürün istek listesine eklendi", "success");
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
      // showSnackbar,
      onFavoriteChange,
    ]
  );

  // ========================================================================
  // RENDER
  // ========================================================================

  if (type === "button") {
    // Button component için size mapping (lg → md)
    const buttonSize: "xxs" | "xs" | "sm" | "md" = size === "lg" ? "md" : size;

    return (
      <Button
        variant={isFavorite ? "error" : "outline"}
        size={buttonSize}
        onClick={handleToggleFavorite}
        disabled={disabled}
        loading={isLoading}
        leftIcon={iconName}
        className={className}
        aria-label={buttonLabel}
      >
        {buttonLabel}
      </Button>
    );
  }

  // Icon component için size mapping (xxs, xs → sm)
  const mappedIconSize: "sm" | "md" | "lg" =
    size === "xxs" || size === "xs" ? "sm" : size === "lg" ? "lg" : size;

  return (
    <div
      className="d-inline-block"
      style={{ width: "auto", maxWidth: "fit-content" }}
    >
      <Icon
        icon={iconName}
        variant={iconVariant}
        size={mappedIconSize}
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
