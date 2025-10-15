import { GalleryDto } from "@/types";

export interface GalleryDetailContextValue {
  galleryId: number;
  gallery: GalleryDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface GalleryDetailProviderProps {
  children: React.ReactNode;
  galleryId: number;
}
