import { SchoolSummaryDto } from "../institution";
import { UserSummaryDto } from "../user";
import { PostType, PostStatus } from "@/enums";
import { PostItemDto } from "./PostItemDto";

export interface PostDto {
  id: number;
  title: string;
  content: string;
  postType: PostType;
  status: PostStatus;
  scheduledAt?: string; // ISO datetime string
  publishedAt?: string; // ISO datetime string
  expiresAt?: string; // ISO datetime string

  // Media content
  featuredImageUrl?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoDurationSeconds?: number;
  mediaAttachments?: string; // JSON string

  // Settings
  allowComments: boolean;
  allowLikes: boolean;
  isFeatured: boolean;
  isPinned: boolean;
  pinExpiresAt?: string; // ISO datetime string

  // SEO
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
  hashtags?: string;

  // Engagement metrics
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  shareCount?: number;
  engagementScore?: number;

  // Content moderation
  isModerated: boolean;
  isFlagged: boolean;
  flagCount?: number;

  // Analytics
  reachCount?: number;
  impressionCount?: number;
  clickCount?: number;
  averageReadTimeSeconds?: number;

  // External links
  externalUrl?: string;
  callToAction?: string;
  ctaUrl?: string;

  // Location
  locationName?: string;
  latitude?: number;
  longitude?: number;

  // Relationships
  school?: SchoolSummaryDto;
  author?: UserSummaryDto;
  items?: PostItemDto[];
  isActive: boolean;
  createdAt: string; // ISO datetime string
}

export interface PostSummaryDto {
  id: number;
  title: string;
  slug: string;
  postType: PostType;
  status: PostStatus;
  featuredImageUrl?: string;
  publishedAt?: string; // ISO datetime string
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  isFeatured: boolean;
  isPinned: boolean;
  schoolName?: string;
  authorName?: string;
}
