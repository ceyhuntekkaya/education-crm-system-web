import {
  GalleryDto,
  GalleryCreateDto,
  GalleryUpdateDto,
  GalleryItemCreateDto,
  GalleryItemUpdateDto,
  GalleryItemDto,
} from "@/types";

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
  mediaTypeOptions: SelectOption[];

  // Actions
  fetchGallery: (() => void) | undefined;
  postGallery: (data: GalleryCreateDto) => Promise<GalleryDto | null>;
  putGallery: (data: GalleryUpdateDto) => Promise<GalleryDto | null>;

  // Gallery Item Actions
  postGalleryItem: (
    data: GalleryItemCreateDto
  ) => Promise<GalleryItemDto | null>;
  putGalleryItem: (
    data: GalleryItemUpdateDto
  ) => Promise<GalleryItemDto | null>;
  galleryItemLoading: boolean;
}
