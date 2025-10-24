import {
  BrandSummaryDto,
  CampusSummaryDto,
  SchoolSummaryDto,
} from "../institution";
import { UserSummaryDto } from "../user";
import { GalleryItemDto } from "./GalleryItemDto";
import { GalleryType, GalleryVisibility } from "@/enums";

export interface GalleryDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  description?: string;
  slug?: string;
  galleryType?: GalleryType;
  visibility?: GalleryVisibility;
  coverImageUrl?: string;
  /** Format: int32 */
  sortOrder?: number;
  isFeatured?: boolean;
  allowComments?: boolean;
  allowDownloads?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
  /** Format: int64 */
  itemCount?: number;
  /** Format: int64 */
  viewCount?: number;
  /** Format: int64 */
  downloadCount?: number;
  /** Format: int64 */
  totalSizeBytes?: number;
  brand?: BrandSummaryDto;
  campus?: CampusSummaryDto;
  school?: SchoolSummaryDto;
  createdByUser?: UserSummaryDto;
  items?: GalleryItemDto[];
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
}
