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

// Gallery table props - Artık props almıyor, context kullanıyor
export interface GalleryTableProps {
  // Props kaldırıldı, context kullanılıyor
}

// Gallery context type
export interface GalleryContextType {
  // Gallery data
  schoolGalleries: GalleryDto[];
  galleriesLoading: boolean;
  galleriesError: string | null;

  // Actions
  refetchGalleries: () => void;
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
