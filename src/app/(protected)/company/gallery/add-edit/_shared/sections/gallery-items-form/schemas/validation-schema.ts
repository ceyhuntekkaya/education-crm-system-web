import * as Yup from "yup";
import { MediaType } from "@/enums";

/**
 * Gallery item form validation schema
 */
export const validationSchema = Yup.object({
  // Required fields
  itemType: Yup.string()
    .required("Medya tipi gereklidir")
    .oneOf(Object.values(MediaType), "Geçersiz medya tipi"),
  fileUrl: Yup.string()
    .required("Dosya URL'si gereklidir")
    .url("Geçerli bir URL giriniz"),
  fileName: Yup.string()
    .required("Dosya adı gereklidir")
    .min(1, "Dosya adı en az 1 karakter olmalıdır"),
  originalFileName: Yup.string()
    .required("Orijinal dosya adı gereklidir")
    .min(1, "Orijinal dosya adı en az 1 karakter olmalıdır"),
  fileSizeBytes: Yup.number()
    .required("Dosya boyutu gereklidir")
    .min(1, "Dosya boyutu 0'dan büyük olmalıdır"),
  mimeType: Yup.string()
    .required("MIME tipi gereklidir")
    .min(1, "MIME tipi gereklidir"),

  // Optional fields
  title: Yup.string()
    .min(3, "Başlık en az 3 karakter olmalıdır")
    .max(200, "Başlık en fazla 200 karakter olabilir")
    .optional(),
  description: Yup.string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .optional(),
  altText: Yup.string()
    .max(255, "Alt metin en fazla 255 karakter olabilir")
    .optional(),
  thumbnailUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  // Image/Video specific
  width: Yup.number().min(1, "Genişlik 0'dan büyük olmalıdır").optional(),
  height: Yup.number().min(1, "Yükseklik 0'dan büyük olmalıdır").optional(),
  durationSeconds: Yup.number().min(0, "Süre negatif olamaz").optional(),
  videoFormat: Yup.string().optional(),

  // Camera/Device information
  cameraMake: Yup.string().optional(),
  cameraModel: Yup.string().optional(),
  takenAt: Yup.string().optional(),

  // Location
  locationName: Yup.string().optional(),
  latitude: Yup.number()
    .min(-90, "Enlem -90 ile 90 arasında olmalıdır")
    .max(90, "Enlem -90 ile 90 arasında olmalıdır")
    .optional(),
  longitude: Yup.number()
    .min(-180, "Boylam -180 ile 180 arasında olmalıdır")
    .max(180, "Boylam -180 ile 180 arasında olmalıdır")
    .optional(),

  // Organization
  sortOrder: Yup.number().min(0, "Sıralama 0'dan küçük olamaz").optional(),
  isFeatured: Yup.boolean().optional(),
  isCover: Yup.boolean().optional(),
  tags: Yup.string().optional(),
});
