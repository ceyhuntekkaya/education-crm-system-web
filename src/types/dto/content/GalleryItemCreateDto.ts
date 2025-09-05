export interface GalleryItemCreateDto {
  galleryId?: number;
  title?: string;
  description?: string;
  altText?: string;
  itemType?: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  fileName?: string;
  originalFileName?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  width?: number;
  height?: number;
  durationSeconds?: number;
  videoFormat?: string;
  cameraMake?: string;
  cameraModel?: string;
  takenAt?: string;
}
