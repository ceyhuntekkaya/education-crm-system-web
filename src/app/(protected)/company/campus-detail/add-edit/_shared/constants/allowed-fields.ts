/**
 * Edit modunda izin verilen alanlar
 * Bu alanlar güncelleme sırasında backend'e gönderilir
 */
export const ALLOWED_FIELDS_IN_EDIT_MODE = [
  "brandId",
  "name",
  "description",
  "logoUrl",
  "coverImageUrl",
  "email",
  "phone",
  "fax",
  "websiteUrl",
  "addressLine1",
  "addressLine2",
  "postalCode",
  "latitude",
  "longitude",
  "country",
  "province",
  "district",
  "neighborhood",
  "facebookUrl",
  "twitterUrl",
  "instagramUrl",
  "linkedinUrl",
  "youtubeUrl",
  "metaTitle",
  "metaDescription",
  "metaKeywords",
  "establishedYear",
] as const;
