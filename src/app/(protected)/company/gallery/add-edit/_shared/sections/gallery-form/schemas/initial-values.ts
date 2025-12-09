import { GalleryFormData } from "../types/form-data";
import { GalleryType, GalleryVisibility } from "@/enums";

export const initialValues: GalleryFormData = {
  // Required fields
  schoolId: 0,
  title: "",
  galleryType: "" as any, // No default value - placeholder will be shown
  visibility: "" as any, // No default value - placeholder will be shown

  // Optional fields
  description: "",
  coverImageUrl: "",
  isFeatured: false,

  // IDs
  brandId: undefined,
  campusId: undefined,

  // Items (multi file upload)
  items: [],
};
