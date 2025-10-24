/**
 * GalleryUpdateDto'da izin verilen alanlar
 * PUT işleminde sadece bu alanlar gönderilir
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  "title",
  "description",
  "galleryType",
  "visibility",
  "coverImageUrl",
  "sortOrder",
  "isFeatured",
  "allowComments",
  "allowDownloads",
  "metaTitle",
  "metaDescription",
  "tags",
] as const;
