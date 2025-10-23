import { PostType, PostStatus } from "@/enums";

export interface PostFormData {
  // Required fields
  schoolId: number;
  title: string;
  content: string;
  postType: PostType;
  status: PostStatus;

  // Optional dates
  scheduledAt?: string;
  expiresAt?: string;

  // Media content
  featuredImageUrl?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoDurationSeconds?: number;
  mediaAttachments?: string;

  // Settings
  allowComments?: boolean;
  allowLikes?: boolean;
  isFeatured?: boolean;
  isPinned?: boolean;
  pinExpiresAt?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
  hashtags?: string;

  // External links
  externalUrl?: string;
  callToAction?: string;
  ctaUrl?: string;

  // Location
  locationName?: string;
  latitude?: number;
  longitude?: number;
}
