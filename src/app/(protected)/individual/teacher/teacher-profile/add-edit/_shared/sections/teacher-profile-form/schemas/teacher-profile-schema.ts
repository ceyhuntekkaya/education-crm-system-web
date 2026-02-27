import * as yup from "yup";

export const teacherProfileSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Ad Soyad zorunludur")
    .max(100, "Ad Soyad en fazla 100 karakter olabilir"),
  email: yup
    .string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta adresi giriniz")
    .max(100, "E-posta en fazla 100 karakter olabilir"),
  phone: yup.string().max(20, "Telefon en fazla 20 karakter olabilir"),
  city: yup.string().max(50, "Şehir en fazla 50 karakter olabilir"),
  branch: yup.string().max(100, "Branş en fazla 100 karakter olabilir"),
  // educationLevel ve experienceYears backend DTO'sunda YOK - gönderilmez
  bio: yup.string(),
  profilePhotoUrl: yup
    .string()
    .max(500, "Profil fotoğrafı URL'i en fazla 500 karakter olabilir"),
  videoUrl: yup.string().max(500, "Video URL'i en fazla 500 karakter olabilir"),
  cvUrl: yup.string().max(500, "CV URL'i en fazla 500 karakter olabilir"),
  isActive: yup.boolean(),
  provinceIds: yup.array().of(yup.number()),
});

export type TeacherProfileFormValues = yup.InferType<
  typeof teacherProfileSchema
>;
