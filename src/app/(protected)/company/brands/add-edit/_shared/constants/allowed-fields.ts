/**
 * BrandCreateDto'da izin verilen alanlar
 * PUT işleminde sadece bu alanlar gönderilir
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  "name",
  "description",
  "logoUrl",
  "coverImageUrl",
  "websiteUrl",
  "email",
  "phone",
  "foundedYear",
  "facebookUrl",
  "twitterUrl",
  "instagramUrl",
  "linkedinUrl",
  "youtubeUrl",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
] as const;
