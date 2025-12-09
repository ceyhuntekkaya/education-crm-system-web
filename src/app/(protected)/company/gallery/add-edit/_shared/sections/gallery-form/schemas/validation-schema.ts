import * as Yup from "yup";
import { GalleryType, GalleryVisibility, MediaType } from "@/enums";

/**
 * Gallery form validation schema
 */
export const validationSchema = Yup.object({
  // Required fields
  title: Yup.string()
    .required("Başlık gereklidir")
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .max(200, "Başlık en fazla 200 karakter olabilir"),
  galleryType: Yup.string()
    .required("Galeri tipi gereklidir")
    .oneOf(Object.values(GalleryType), "Geçersiz galeri tipi"),
  visibility: Yup.string()
    .required("Görünürlük gereklidir")
    .oneOf(Object.values(GalleryVisibility), "Geçersiz görünürlük değeri"),

  // Optional fields
  description: Yup.string().optional(),
  coverImageUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),
  isFeatured: Yup.boolean().optional(),

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
