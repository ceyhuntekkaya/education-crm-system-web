import * as yup from "yup";

export const organizerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Organizatör adı zorunludur")
    .max(200, "Ad en fazla 200 karakter olabilir"),
  type: yup.string().required("Organizatör türü zorunludur"),
  description: yup
    .string()
    .max(5000, "Açıklama en fazla 5000 karakter olabilir"),
  logoUrl: yup.string().max(500, "Logo URL'i en fazla 500 karakter olabilir"),
  website: yup.string().max(300, "Web sitesi en fazla 300 karakter olabilir"),
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .max(100, "E-posta en fazla 100 karakter olabilir"),
  phone: yup.string().max(20, "Telefon en fazla 20 karakter olabilir"),
  address: yup.string().max(500, "Adres en fazla 500 karakter olabilir"),
  city: yup.string().max(50, "Şehir en fazla 50 karakter olabilir"),
  socialMediaLinks: yup
    .string()
    .max(2000, "Sosyal medya bağlantıları en fazla 2000 karakter olabilir"),
  isVerified: yup.boolean(),
  isActive: yup.boolean(),
  slug: yup.string().max(250, "Slug en fazla 250 karakter olabilir"),
});

export type OrganizerFormValues = yup.InferType<typeof organizerSchema>;
