export interface GalleryDto {
  id?: number;
  title?: string;
  description?: string;
  slug?: string;
  galleryType?: string;
  visibility?: string;
  coverImageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  allowComments?: boolean;
  allowDownloads?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
}
