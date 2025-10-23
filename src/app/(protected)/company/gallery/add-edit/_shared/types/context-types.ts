import { GalleryDto, GalleryCreateDto, GalleryUpdateDto } from "@/types";

export interface SelectOption {
  value: string;
  label: string;
}

export interface GalleryAddEditContextType {
  // Current gallery data
  gallery: GalleryDto | null;
  galleryLoading: boolean;
  galleryError: string | null;

  // Edit mode state
  isEditing: boolean;
  galleryId: string | null;

  // Form options
  galleryTypeOptions: SelectOption[];
  visibilityOptions: SelectOption[];

  // Actions
  fetchGallery: (() => void) | undefined;
  postGallery: (data: GalleryCreateDto) => Promise<GalleryDto | null>;
  putGallery: (data: GalleryUpdateDto) => Promise<GalleryDto | null>;
}
