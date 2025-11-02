import * as Yup from "yup";
import { MediaType } from "@/enums";

/**
 * Post form validation schema
 */
export const validationSchema = Yup.object({
  // Required fields
  title: Yup.string()
    .required("Başlık gereklidir")
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .max(200, "Başlık en fazla 200 karakter olabilir"),
  content: Yup.string()
    .required("İçerik gereklidir")
    .min(10, "İçerik en az 10 karakter olmalıdır"),
  postType: Yup.string().required("Gönderi tipi gereklidir"),
  status: Yup.string().required("Durum gereklidir"),

  // Optional dates
  scheduledAt: Yup.string().optional(),
  expiresAt: Yup.string().optional(),

  // Media content
  featuredImageUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  videoUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  videoThumbnailUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  videoDurationSeconds: Yup.number().min(0).optional(),
  mediaAttachments: Yup.string().optional(),

  // Settings
  allowComments: Yup.boolean().optional(),
  allowLikes: Yup.boolean().optional(),
  isFeatured: Yup.boolean().optional(),
  isPinned: Yup.boolean().optional(),
  pinExpiresAt: Yup.string().optional(),

  // SEO
  metaTitle: Yup.string()
    .max(60, "Meta başlık en fazla 60 karakter olabilir")
    .optional(),
  metaDescription: Yup.string()
    .max(160, "Meta açıklama en fazla 160 karakter olabilir")
    .optional(),
  tags: Yup.string().optional(),
  hashtags: Yup.string().optional(),

  // External links
  externalUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  callToAction: Yup.string().optional(),
  ctaUrl: Yup.string().optional(),

  // Location
  locationName: Yup.string().optional(),
  latitude: Yup.number().min(-90).max(90).optional(),
  longitude: Yup.number().min(-180).max(180).optional(),

  // Items (multi file upload)
  items: Yup.array()
    .of(
      Yup.object({
        itemType: Yup.string()
          .oneOf(Object.values(MediaType), "Geçersiz medya tipi")
          .required("Medya tipi gereklidir"),
        fileUrl: Yup.string().required("Dosya URL'si gereklidir"),
        fileName: Yup.string().required("Dosya adı gereklidir"),
        sortOrder: Yup.number()
          .min(0, "Sıralama 0'dan küçük olamaz")
          .required("Sıralama gereklidir"),
      })
    )
    .optional()
    .nullable(),
});
