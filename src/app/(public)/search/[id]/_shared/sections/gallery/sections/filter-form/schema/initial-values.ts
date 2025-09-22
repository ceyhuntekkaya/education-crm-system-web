import { GallerySearchDto } from "@/types/dto/content/GallerySearchDto";

// GallerySearchDto için initial values
export const galleryFilterInitialValues: GallerySearchDto = {
  searchTerm: "",
  brandId: undefined,
  campusId: undefined,
  schoolId: undefined,
  galleryType: undefined,
  visibility: undefined,
  isFeatured: false,
  tags: "",
  page: 1,
  size: 12,
  sortBy: "createdAt",
  sortDirection: "DESC",
};
