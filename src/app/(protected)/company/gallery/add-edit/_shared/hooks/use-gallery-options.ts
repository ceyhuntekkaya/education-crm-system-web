"use client";

import { useMemo } from "react";
import { GalleryType, GalleryVisibility } from "@/enums";
import { UseGalleryOptionsReturn } from "../types";
import { getGalleryTypeLabel, getGalleryVisibilityLabel } from "../utils";

/**
 * Gallery form için enum options hook'u
 */
export const useGalleryOptions = (): UseGalleryOptionsReturn => {
  // GalleryType options
  const galleryTypeOptions = useMemo(
    () =>
      Object.entries(GalleryType).map(([key, value]) => ({
        value: value,
        label: getGalleryTypeLabel(value),
      })),
    []
  );

  // GalleryVisibility options
  const visibilityOptions = useMemo(
    () =>
      Object.entries(GalleryVisibility).map(([key, value]) => ({
        value: value,
        label: getGalleryVisibilityLabel(value),
      })),
    []
  );

  return {
    galleryTypeOptions,
    visibilityOptions,
  };
};
