import { PostFormData } from "../types/form-data";
import { PostType, PostStatus } from "@/enums";

export const initialValues: PostFormData = {
  // Required fields
  schoolId: 0,
  title: "",
  content: "",
  postType: PostType.TEXT,
  status: PostStatus.DRAFT,

  // Optional dates
  scheduledAt: "",
  expiresAt: "",

  // Media content
  featuredImageUrl: "",
  videoUrl: "",
  videoThumbnailUrl: "",
  videoDurationSeconds: undefined,
  mediaAttachments: "",

  // Settings
  allowComments: true,
  allowLikes: true,
  isFeatured: false,
  isPinned: false,
  pinExpiresAt: "",

  // SEO
  metaTitle: "",
  metaDescription: "",
  tags: "",
  hashtags: "",

  // External links
  externalUrl: "",
  callToAction: "",
  ctaUrl: "",

  // Location
  locationName: "",
  latitude: undefined,
  longitude: undefined,
};
