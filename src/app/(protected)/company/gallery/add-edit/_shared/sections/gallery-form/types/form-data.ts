import { GalleryType, GalleryVisibility, MediaType } from "@/enums";

export interface GalleryFormData {
  // Required fields
  schoolId: number;
  title: string;
  galleryType: GalleryType;
  visibility: GalleryVisibility;

  // Optional fields
  description?: string;
  coverImageUrl?: string;
  isFeatured?: boolean;

  // IDs (optional, for brand/campus level)
  brandId?: number;
  campusId?: number;

  // Items (multi file upload)
  items?: Array<{
    itemType: MediaType;
    fileUrl: string;
    fileName: string;
    sortOrder?: number;
  }>;
}
