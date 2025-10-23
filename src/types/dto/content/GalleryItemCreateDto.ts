import { MediaType } from "@/enums";

export interface GalleryItemCreateDto {
  galleryId: number;
  title?: string;
  description?: string;
  altText?: string;
  itemType: MediaType;
  fileUrl: string;
  thumbnailUrl?: string;
  fileName: string;
  originalFileName: string;
  fileSizeBytes: number;
  mimeType: string;

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
