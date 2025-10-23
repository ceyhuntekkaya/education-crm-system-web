import { GalleryDto } from "@/types";

/**
 * API'den gelen Gallery verisini form verilerine dönüştürür
 * @param gallery API'den gelen gallery verisi
 * @returns Form için hazırlanmış veri
 */
export const transformGalleryToFormData = (gallery: GalleryDto | null): any => {
  if (!gallery) return null;

  return {
    title: gallery.title || "",
    description: gallery.description || "",
    galleryType: gallery.galleryType || "",
    visibility: gallery.visibility || "",
    coverImageUrl: gallery.coverImageUrl || "",
    sortOrder: gallery.sortOrder || 0,
    isFeatured: gallery.isFeatured || false,
    allowComments: gallery.allowComments || false,
    allowDownloads: gallery.allowDownloads || false,
    metaTitle: gallery.metaTitle || "",
    metaDescription: gallery.metaDescription || "",
    tags: gallery.tags || "",
  };
};
