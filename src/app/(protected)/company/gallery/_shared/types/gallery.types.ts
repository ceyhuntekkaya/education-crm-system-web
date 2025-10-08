import { GalleryDto } from "@/types/dto/content/GalleryDto";

// Badge variant type
export type BadgeVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "danger" 
  | "warning" 
  | "info" 
  | "light" 
  | "dark";

// Gallery column handlers
export interface GalleryColumnHandlers {
  onViewDetails?: (gallery: GalleryDto) => void;
  onEdit?: (gallery: GalleryDto) => void;
  onToggleStatus?: (gallery: GalleryDto) => void;
  onDelete?: (gallery: GalleryDto) => void;
  onDuplicate?: (gallery: GalleryDto) => void;
  onViewGallery?: (gallery: GalleryDto) => void;
}

// Gallery action buttons props
export interface GalleryActionButtonsProps {
  gallery: GalleryDto;
  onViewDetails?: (gallery: GalleryDto) => void;
  onEdit?: (gallery: GalleryDto) => void;
  onToggleStatus?: (gallery: GalleryDto) => void;
  onDelete?: (gallery: GalleryDto) => void;
  onDuplicate?: (gallery: GalleryDto) => void;
  onViewGallery?: (gallery: GalleryDto) => void;
}

// Gallery table props
export interface GalleryTableProps {
  galleries?: GalleryDto[];
  loading?: boolean;
}

// Gallery context type
export interface GalleryContextType {
  galleries: GalleryDto[];
  loading: boolean;
  selectedGallery: GalleryDto | null;
  setSelectedGallery: (gallery: GalleryDto | null) => void;
  refreshGalleries: () => void;
}

// Gallery stats type
export interface GalleryStats {
  totalGalleries: number;
  activeGalleries: number;
  totalViews: number;
  totalDownloads: number;
  featuredGalleries: number;
  publicGalleries: number;
}
