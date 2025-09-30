export interface PostSearchDto {
  /** Search query */
  query?: string;

  /** Post type filter */
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

  /** Post status filter */
  status?:
    | "DRAFT"
    | "SCHEDULED"
    | "PUBLISHED"
    | "ARCHIVED"
    | "DELETED"
    | "MODERATION"
    | "REJECTED"
    | "EXPIRED";

  /** Author name filter */
  authorName?: string;

  /** School name filter */
  schoolName?: string;

  /** Featured posts only */
  isFeatured?: boolean;

  /** Pinned posts only */
  isPinned?: boolean;

  /** Date range filters */
  publishedAfter?: string;
  publishedBefore?: string;

  /** Tags filter */
  tags?: string[];

  /** Hashtags filter */
  hashtags?: string[];

  /** Sorting options */
  sortBy?:
    | "publishedAt"
    | "likeCount"
    | "viewCount"
    | "commentCount"
    | "shareCount"
    | "engagementScore";
  sortOrder?: "asc" | "desc";

  /** Pagination */
  page?: number;
  size?: number;
}
