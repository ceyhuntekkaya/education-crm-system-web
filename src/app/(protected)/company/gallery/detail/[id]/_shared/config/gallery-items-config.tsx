import React from "react";
import type { GalleryItemsItemConfig } from "../types";

/**
 * Galeri öğeleri konfigürasyonu
 */
export const galleryItemsConfig: GalleryItemsItemConfig[] = [
  {
    label: "Toplam Öğe Sayısı",
    value: (gallery) => (
      <span className="text-dark">
        <i className="ph ph-images me-4"></i>
        {gallery?.items?.length || 0} öğe
      </span>
    ),
    isShowing: (gallery) => !!gallery?.items && gallery.items.length > 0,
  },
  {
    label: "Görsel Sayısı",
    value: (gallery) => {
      const count =
        gallery?.items?.filter((item: any) => item.itemType === "IMAGE")
          .length || 0;
      return (
        <span className="text-dark">
          <i className="ph ph-image me-4"></i>
          {count} görsel
        </span>
      );
    },
    isShowing: (gallery) => {
      const count =
        gallery?.items?.filter((item: any) => item.itemType === "IMAGE")
          .length || 0;
      return count > 0;
    },
  },
  {
    label: "Video Sayısı",
    value: (gallery) => {
      const count =
        gallery?.items?.filter((item: any) => item.itemType === "VIDEO")
          .length || 0;
      return (
        <span className="text-dark">
          <i className="ph ph-video me-4"></i>
          {count} video
        </span>
      );
    },
    isShowing: (gallery) => {
      const count =
        gallery?.items?.filter((item: any) => item.itemType === "VIDEO")
          .length || 0;
      return count > 0;
    },
  },
  {
    label: "Dosya Sayısı",
    value: (gallery) => {
      const count =
        gallery?.items?.filter((item: any) => item.itemType === "DOCUMENT")
          .length || 0;
      return (
        <span className="text-dark">
          <i className="ph ph-file me-4"></i>
          {count} dosya
        </span>
      );
    },
    isShowing: (gallery) => {
      const count =
        gallery?.items?.filter((item: any) => item.itemType === "DOCUMENT")
          .length || 0;
      return count > 0;
    },
  },
];
