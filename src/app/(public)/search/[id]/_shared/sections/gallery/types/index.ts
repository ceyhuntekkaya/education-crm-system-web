export interface GalleryProps {
  institutionId: string;
}

export interface GalleryCardProps {
  gallery: any; // GallerySummaryDto tipini kullanabilirsiniz
  onCardClick?: (galleryId: number) => void;
}

export interface GalleryHeaderProps {
  title: string;
  count: number;
}

export interface GalleryStatsProps {
  itemCount?: number;
  viewCount?: number;
}

export interface GalleryBadgeProps {
  galleryType?: string;
  isFeatured?: boolean;
}

export interface GalleryEmptyStateProps {
  title?: string;
  description?: string;
}

export interface GalleryFooterProps {
  galleryCount: number;
  onViewAllClick?: () => void;
}
