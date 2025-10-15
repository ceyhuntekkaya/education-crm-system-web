import { useMemo } from "react";
import { createSections } from "../utils";
import { GALLERY_SECTIONS } from "../config";

/**
 * Gallery sections hook'u
 * Tüm section işleme mantığını kapsüller
 */
export const useGallerySections = (gallery: any) => {
  return useMemo(() => {
    // Gallery null ise boş array döndür
    if (!gallery) return [];

    // Ana section'ları oluştur
    const gallerySections = createSections(GALLERY_SECTIONS, gallery);

    return gallerySections;
  }, [gallery]);
};
