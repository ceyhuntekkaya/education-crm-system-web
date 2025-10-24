/**
 * PostUpdateDto'da izin verilen alanlar
 * PUT işleminde sadece bu alanlar gönderilir
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  "title",
  "content",
  "status",
  "scheduledAt",
  "expiresAt",
  "featuredImageUrl",
  "videoUrl",
  "videoThumbnailUrl",
  "mediaAttachments",
  "allowComments",
  "allowLikes",
  "isFeatured",
  "isPinned",
  "pinExpiresAt",
  "metaTitle",
  "metaDescription",
  "tags",
  "hashtags",
  "externalUrl",
  "callToAction",
  "ctaUrl",
] as const;
