import * as Yup from "yup";

/**
 * User form validation schema
 */
export const validationSchema = Yup.object({
  // Basic Info
  firstName: Yup.string().required("Ad gereklidir"),
  lastName: Yup.string().required("Soyad gereklidir"),
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta gereklidir"),
  phone: Yup.string().required("Telefon numarası gereklidir"),

  // Password (sadece yeni kullanıcı için)
  password: Yup.string().when("$isEditing", {
    is: false,
    then: (schema) =>
      schema
        .min(8, "Şifre en az 8 karakter olmalıdır")
        .required("Şifre gereklidir"),
    otherwise: (schema) => schema.optional(),
  }),
  confirmPassword: Yup.string().when("$isEditing", {
    is: false,
    then: (schema) =>
      schema
        .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
        .required("Şifre onayı gereklidir"),
    otherwise: (schema) => schema.optional(),
  }),

  // Profile
  profileImageUrl: Yup.string().url("Geçerli bir URL giriniz").optional(),

  // Location
  countryId: Yup.number().optional(),
  provinceId: Yup.number().optional(),
  districtId: Yup.number().optional(),
  neighborhoodId: Yup.number().optional(),
  // addressLine1: Yup.string().optional(),
  // addressLine2: Yup.string().optional(),
  // postalCode: Yup.string().optional(),

  // Preferences
  emailNotifications: Yup.boolean().optional(),
  smsNotifications: Yup.boolean().optional(),
  marketingEmails: Yup.boolean().optional(),
  preferredLanguage: Yup.string().optional(),
  timezone: Yup.string().optional(),

  // User Type (sadece yeni kullanıcı için)
  userType: Yup.string().when("$isEditing", {
    is: false,
    then: (schema) => schema.required("Kullanıcı tipi gereklidir"),
    otherwise: (schema) => schema.optional(),
  }),

  // Terms (sadece yeni kullanıcı için)
  // Not: Bu alanlar submit sırasında kontrol edilir
  acceptTerms: Yup.boolean().when("$isEditing", {
    is: false,
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.optional(),
  }),
  acceptPrivacy: Yup.boolean().when("$isEditing", {
    is: false,
    then: (schema) => schema.optional(),
    otherwise: (schema) => schema.optional(),
  }),
  acceptMarketing: Yup.boolean().optional(),
});
