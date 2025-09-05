export interface GalleryItemDto {
  id?: number;
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
  aspectRatio?: string;
  durationSeconds?: number;
  videoFormat?: string;
  videoCodec?: string;
}
