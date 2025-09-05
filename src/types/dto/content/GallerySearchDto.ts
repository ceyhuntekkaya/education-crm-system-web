export interface GallerySearchDto {
  searchTerm?: string;
  brandId?: number;
  campusId?: number;
  schoolId?: number;
  galleryType?: string;
  visibility?: string;
  isFeatured?: boolean;
  tags?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}
