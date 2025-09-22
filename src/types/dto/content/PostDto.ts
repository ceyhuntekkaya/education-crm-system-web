import { SchoolSummaryDto } from "../institution";
import { UserSummaryDto } from "../user";

export interface PostDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  content?: string;
  /** @enum {string} */
  postType?:
    | "TEXT"
    | "IMAGE"
    | "VIDEO"
    | "GALLERY"
    | "LINK"
    | "EVENT"
    | "ANNOUNCEMENT"
    | "NEWS"
    | "ACHIEVEMENT"
    | "CELEBRATION"
    | "POLL"
    | "QUOTE"
    | "TESTIMONIAL"
    | "BEHIND_SCENES"
    | "LIVE_STREAM";
  /** @enum {string} */
  status?:
    | "DRAFT"
    | "SCHEDULED"
    | "PUBLISHED"
    | "ARCHIVED"
    | "DELETED"
    | "MODERATION"
    | "REJECTED"
    | "EXPIRED";
  /** Format: date-time */
  scheduledAt?: string;
  /** Format: date-time */
  publishedAt?: string;
  /** Format: date-time */
  expiresAt?: string;
  featuredImageUrl?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  /** Format: int32 */
  videoDurationSeconds?: number;
  mediaAttachments?: string;
  allowComments?: boolean;
  allowLikes?: boolean;
  isFeatured?: boolean;
  isPinned?: boolean;
  /** Format: date-time */
  pinExpiresAt?: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
  hashtags?: string;
  /** Format: int64 */
  likeCount?: number;
  /** Format: int64 */
  commentCount?: number;
  /** Format: int64 */
  viewCount?: number;
  /** Format: int64 */
  shareCount?: number;
  /** Format: double */
  engagementScore?: number;
  isModerated?: boolean;
  isFlagged?: boolean;
  /** Format: int32 */
  flagCount?: number;
  /** Format: int64 */
  reachCount?: number;
  /** Format: int64 */
  impressionCount?: number;
  /** Format: int64 */
  clickCount?: number;
  /** Format: int32 */
  averageReadTimeSeconds?: number;
  externalUrl?: string;
  callToAction?: string;
  ctaUrl?: string;
  locationName?: string;
  /** Format: double */
  latitude?: number;
  /** Format: double */
  longitude?: number;
  school?: SchoolSummaryDto;
  author?: UserSummaryDto;
  isActive?: boolean;
  /** Format: date-time */
  createdAt?: string;
}
