export interface PostSummaryDto {
  /** Format: int64 */
  id?: number;
  title?: string;
  slug?: string;
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
  featuredImageUrl?: string;
  /** Format: date-time */
  publishedAt?: string;
  /** Format: int64 */
  likeCount?: number;
  /** Format: int64 */
  commentCount?: number;
  /** Format: int64 */
  viewCount?: number;
  isFeatured?: boolean;
  isPinned?: boolean;
  schoolName?: string;
  authorName?: string;
}
