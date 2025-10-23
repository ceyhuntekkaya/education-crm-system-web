import { MediaType, ProcessingStatus } from "@/enums";

export interface GalleryItemFormData {
  // Required fields
  galleryId: number;
  itemType: MediaType;
  fileUrl: string;
  fileName: string;
  originalFileName: string;
  fileSizeBytes: number;
  mimeType: string;

  // Optional fields
  title?: string;
  description?: string;
  altText?: string;
  thumbnailUrl?: string;

  // Image/Video specific
  width?: number;
  height?: number;
  durationSeconds?: number;
  videoFormat?: string;

  // Camera/Device information
  cameraMake?: string;
  cameraModel?: string;
  takenAt?: string; // ISO datetime string

  // Location
  locationName?: string;
  latitude?: number;
  longitude?: number;

  // Organization
  sortOrder?: number;
  isFeatured?: boolean;
  isCover?: boolean;
  tags?: string;
}
