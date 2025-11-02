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
  galleryDetailLoading: boolean; // Veri çekerken gösterilecek loading
  gallerySubmitLoading: boolean; // Form submit edilirken button loading
  galleryError: string | null;

  // Edit mode state
  isEditing: boolean;
  galleryId: string | null;

  // Selected item state
  selectedItem: GalleryItemDto | null;
  isAddingNew: boolean;
  setSelectedItem: (item: GalleryItemDto | null) => void;
  setIsAddingNew: (isAdding: boolean) => void;
  handleItemSelect: (item: GalleryItemDto | null) => void;
  handleAddNew: () => void;
  handleItemClick: (item: GalleryItemDto) => void;

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
