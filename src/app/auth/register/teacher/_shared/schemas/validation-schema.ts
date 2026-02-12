import * as Yup from "yup";

/**
 * Step 1: Login Credentials Validation
 */
export const loginCredentialsSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta gereklidir"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre gereklidir"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre onayı gereklidir"),
});

/**
 * Step 2: Personal Info Validation
 */
export const personalInfoSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "Ad en az 2 karakter olmalıdır")
    .max(50, "Ad en fazla 50 karakter olabilir")
    .required("Ad gereklidir"),
  lastName: Yup.string()
    .min(2, "Soyad en az 2 karakter olmalıdır")
    .max(50, "Soyad en fazla 50 karakter olabilir")
    .required("Soyad gereklidir"),
  phone: Yup.string().required("Telefon numarası gereklidir"),
});

/**
 * Tüm formun validation schema'sı
 */
export const teacherRegisterValidationSchema = Yup.object({
  loginCredentials: loginCredentialsSchema,
  personalInfo: personalInfoSchema,
});
