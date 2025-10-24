import { PostStatus } from "@/enums";

export interface PostUpdateDto {
  title?: string;
  content?: string;
  status?: PostStatus;
  scheduledAt?: string; // ISO datetime string
  expiresAt?: string; // ISO datetime string

  // Media content
  featuredImageUrl?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  mediaAttachments?: string; // JSON string

  // Settings
  allowComments?: boolean;
  allowLikes?: boolean;
  isFeatured?: boolean;
  isPinned?: boolean;
  pinExpiresAt?: string; // ISO datetime string

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
  hashtags?: string;

  // External links
  externalUrl?: string;
  callToAction?: string;
  ctaUrl?: string;
}
