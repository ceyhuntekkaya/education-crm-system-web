import * as Yup from "yup";

/**
 * Password change form validation schema
 */
export const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Mevcut şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır"),
  newPassword: Yup.string()
    .required("Yeni şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir"
    ),
  confirmPassword: Yup.string()
    .required("Şifre onayı zorunludur")
    .oneOf([Yup.ref("newPassword")], "Şifreler eşleşmiyor"),
});
