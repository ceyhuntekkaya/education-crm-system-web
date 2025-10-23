import { UserSummaryDto } from "../user";
import { MediaType, ProcessingStatus } from "@/enums";

export interface GalleryItemDto {
  /** Format: int64 */
  id?: number;
  /** Format: int64 */
  galleryId?: number;
  title?: string;
  description?: string;
  altText?: string;
  itemType?: MediaType;
  fileUrl?: string;
  thumbnailUrl?: string;
  fileName?: string;
  originalFileName?: string;
  /** Format: int64 */
  fileSizeBytes?: number;
  mimeType?: string;
  /** Format: int32 */
  width?: number;
  /** Format: int32 */
  height?: number;
  aspectRatio?: string;
  /** Format: int32 */
  durationSeconds?: number;
  videoFormat?: string;
  videoCodec?: string;
  /** Format: int32 */
  bitrate?: number;
  /** Format: double */
  frameRate?: number;
  cameraMake?: string;
  cameraModel?: string;
  /** Format: date-time */
  takenAt?: string;
  locationName?: string;
  /** Format: double */
  latitude?: number;
  /** Format: double */
  longitude?: number;
  /** Format: int32 */
  sortOrder?: number;
  isFeatured?: boolean;
  isCover?: boolean;
  tags?: string;
  colorPalette?: string;
  /** Format: int64 */
  viewCount?: number;
  /** Format: int64 */
  downloadCount?: number;
  /** Format: int64 */
  likeCount?: number;
  processingStatus?: ProcessingStatus;
  processingError?: string;
  /** Format: date-time */
  processedAt?: string;
  isModerated?: boolean;
  /** Format: double */
  moderationScore?: number;
  moderationLabels?: string;
  isFlagged?: boolean;
  flagReason?: string;
  uploadedByUser?: UserSummaryDto;
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
}
