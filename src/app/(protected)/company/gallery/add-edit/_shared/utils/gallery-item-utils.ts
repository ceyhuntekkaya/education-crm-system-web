import { GalleryItemDto } from "@/types";
import { GalleryItemFormData } from "../sections/gallery-items-form/types";

/**
 * GalleryItemDto'yu form data formatına dönüştürür
 */
export const transformGalleryItemToFormData = (
  item: GalleryItemDto
): Partial<GalleryItemFormData> => {
  return {
    galleryId: item.galleryId,
    itemType: item.itemType,
    fileUrl: item.fileUrl,
    fileName: item.fileName,
    originalFileName: item.originalFileName,
    fileSizeBytes: item.fileSizeBytes,
    mimeType: item.mimeType,

    // Optional fields
    title: item.title || "",
    description: item.description || "",
    altText: item.altText || "",
    thumbnailUrl: item.thumbnailUrl || "",

    // Image/Video specific
    width: item.width,
    height: item.height,
    durationSeconds: item.durationSeconds,
    videoFormat: item.videoFormat || "",

    // Camera/Device information
    cameraMake: item.cameraMake || "",
    cameraModel: item.cameraModel || "",
    takenAt: item.takenAt || "",

    // Location
    locationName: item.locationName || "",
    latitude: item.latitude,
    longitude: item.longitude,

    // Organization
    sortOrder: item.sortOrder,
    isFeatured: item.isFeatured,
    isCover: item.isCover,
    tags: item.tags || "",
  };
};
