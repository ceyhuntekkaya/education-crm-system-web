import { GalleryType, GalleryVisibility } from "@/enums";

export interface GalleryUpdateDto {
  title?: string;
  description?: string;
  galleryType?: GalleryType;
  visibility?: GalleryVisibility;
  coverImageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  allowComments?: boolean;
  allowDownloads?: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
}
