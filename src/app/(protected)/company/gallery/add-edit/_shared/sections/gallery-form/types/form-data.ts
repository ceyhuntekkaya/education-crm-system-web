import { GalleryType, GalleryVisibility } from "@/enums";

export interface GalleryFormData {
  // Required fields
  schoolId: number;
  title: string;
  galleryType: GalleryType;
  visibility: GalleryVisibility;

  // Optional fields
  description?: string;
  coverImageUrl?: string;
  sortOrder?: number;
  isFeatured?: boolean;
  allowComments?: boolean;
  allowDownloads?: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;

  // IDs (optional, for brand/campus level)
  brandId?: number;
  campusId?: number;
}
