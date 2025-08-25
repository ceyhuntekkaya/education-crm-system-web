export interface GallerySummaryDto {
  id?: number;
  title?: string;
  slug?: string;
  galleryType?: string;
  coverImageUrl?: string;
  itemCount?: number;
  viewCount?: number;
  isFeatured?: boolean;
  institutionName?: string;
  createdAt?: string;
}
