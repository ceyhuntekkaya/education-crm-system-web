import { GalleryItemFormData } from "../types/form-data";
import { MediaType } from "@/enums";

export const initialValues: GalleryItemFormData = {
  // Required fields
  galleryId: 0,
  itemType: "" as any, // No default value - placeholder will be shown
  fileUrl: "",
  fileName: "",
  originalFileName: "",
  fileSizeBytes: 0,
  mimeType: "",

  // Optional fields
  title: "",
  description: "",
  altText: "",
  thumbnailUrl: "",

  // Image/Video specific
  width: undefined,
  height: undefined,
  durationSeconds: undefined,
  videoFormat: "",

  // Camera/Device information
  cameraMake: "",
  cameraModel: "",
  takenAt: "",

  // Location
  locationName: "",
  latitude: undefined,
  longitude: undefined,

  // Organization
  sortOrder: undefined,
  isFeatured: false,
  isCover: false,
  tags: "",
};
