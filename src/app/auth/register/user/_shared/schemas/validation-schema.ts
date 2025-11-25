import * as Yup from "yup";

/**
 * Step 1: Login Credentials Validation
 */
export const loginCredentialsSchema = Yup.object({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta gereklidir"),
  password: Yup.string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
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
  email: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta gereklidir"),
  phone: Yup.string().required("Telefon numarası gereklidir"),
});

/**
 * Step 3: Verification Code Validation
 */
export const verificationCodeSchema = Yup.object({
  code1: Yup.string()
    .matches(/^[0-9]$/, "Sadece rakam giriniz")
    .required("Gerekli"),
  code2: Yup.string()
    .matches(/^[0-9]$/, "Sadece rakam giriniz")
    .required("Gerekli"),
  code3: Yup.string()
    .matches(/^[0-9]$/, "Sadece rakam giriniz")
    .required("Gerekli"),
  code4: Yup.string()
    .matches(/^[0-9]$/, "Sadece rakam giriniz")
    .required("Gerekli"),
});

/**
 * Tüm formun validation schema'sı
 */
export const userRegisterValidationSchema = Yup.object({
  loginCredentials: loginCredentialsSchema,
  personalInfo: personalInfoSchema,
  verificationCode: verificationCodeSchema,
});
