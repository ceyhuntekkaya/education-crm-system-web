export interface GalleryItemUpdateDto {
  title?: string;
  description?: string;
  altText?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  isCover?: boolean;
  tags?: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
}
