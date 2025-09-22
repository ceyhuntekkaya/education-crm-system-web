import {
  BrandSummaryDto,
  CampusSummaryDto,
  SchoolSummaryDto,
} from "../institution";
import { UserSummaryDto } from "../user";
import { GalleryItemDto } from "./GalleryItemDto";

export interface GalleryDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  description?: string;
  slug?: string;
  /** @enum {string} */
  galleryType?:
    | "MIXED"
    | "PHOTOS"
    | "VIDEOS"
    | "SCHOOL_TOUR"
    | "EVENTS"
    | "FACILITIES"
    | "CLASSROOMS"
    | "OUTDOOR_AREAS"
    | "CAFETERIA"
    | "LIBRARY"
    | "LABORATORY"
    | "SPORTS_FACILITIES"
    | "TRANSPORTATION"
    | "ACHIEVEMENTS"
    | "GRADUATION"
    | "CEREMONIES"
    | "DAILY_ACTIVITIES"
    | "STUDENT_WORK"
    | "STAFF"
    | "CAMPUS_LIFE"
    | "BEFORE_AFTER";
  /** @enum {string} */
  visibility?: "PUBLIC" | "PRIVATE" | "REGISTERED_ONLY" | "PASSWORD_PROTECTED";
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
