export interface GalleryUpdateDto {
  title?: string;
  description?: string;
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
