import * as Yup from "yup";

/**
 * Step 1: Login Credentials Validation
 */
export const loginCredentialsSchema = Yup.object({
  username: Yup.string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .max(50, "Kullanıcı adı en fazla 50 karakter olabilir")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir"
    )
    .required("Kullanıcı adı gereklidir"),
  password: Yup.string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
    )
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
 * Step 4: Campus Info Validation
 */
export const campusInfoSchema = Yup.object({
  brandId: Yup.number().nullable().required("Marka seçimi gereklidir"),
  campusName: Yup.string()
    .min(2, "Kampüs adı en az 2 karakter olmalıdır")
    .max(100, "Kampüs adı en fazla 100 karakter olabilir")
    .required("Kampüs adı gereklidir"),
  countryId: Yup.number().nullable().required("Ülke seçimi gereklidir"),
  provinceId: Yup.number().nullable().required("İl seçimi gereklidir"),
  districtId: Yup.number().nullable().required("İlçe seçimi gereklidir"),
  neighborhoodId: Yup.number().nullable().optional(),
  addressLine1: Yup.string()
    .min(5, "Adres en az 5 karakter olmalıdır")
    .max(200, "Adres en fazla 200 karakter olabilir")
    .required("Adres gereklidir"),
  addressLine2: Yup.string()
    .max(200, "Adres en fazla 200 karakter olabilir")
    .optional(),
  postalCode: Yup.string()
    .matches(/^[0-9]{5}$/, "Posta kodu 5 haneli olmalıdır")
    .required("Posta kodu gereklidir"),
});

/**
 * Step 5: Package Selection Validation
 */
export const packageSelectionSchema = Yup.object({
  selectedPlanId: Yup.string().nullable().required("Paket seçimi gereklidir"),
  planName: Yup.string().optional(),
  planDisplayName: Yup.string().optional(),
  billingPeriod: Yup.string()
    .oneOf(["monthly", "quarterly", "yearly"], "Geçersiz faturalama periyodu")
    .required("Faturalama periyodu gereklidir"),
  price: Yup.number().optional(),
  discountPercentage: Yup.number().optional(),
  trialDays: Yup.number().optional(),
});

/**
 * Step 6: Payment Info Validation
 */
export const paymentInfoSchema = Yup.object({
  cardHolderName: Yup.string()
    .min(3, "Kart sahibi adı en az 3 karakter olmalıdır")
    .max(100, "Kart sahibi adı en fazla 100 karakter olabilir")
    .required("Kart sahibi adı gereklidir"),
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, "Kart numarası 16 haneli olmalıdır")
    .required("Kart numarası gereklidir"),
  expiryMonth: Yup.string()
    .matches(/^(0[1-9]|1[0-2])$/, "Geçerli bir ay giriniz (01-12)")
    .required("Son kullanma ayı gereklidir"),
  expiryYear: Yup.string()
    .matches(/^[0-9]{2}$/, "Yıl 2 haneli olmalıdır (ör: 25)")
    .required("Son kullanma yılı gereklidir"),
  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, "CVV 3 veya 4 haneli olmalıdır")
    .required("CVV gereklidir"),
  acceptTerms: Yup.boolean()
    .oneOf([true], "Kullanım koşullarını kabul etmelisiniz")
    .required("Kullanım koşullarını kabul etmelisiniz"),
  acceptPrivacy: Yup.boolean()
    .oneOf([true], "Gizlilik politikasını kabul etmelisiniz")
    .required("Gizlilik politikasını kabul etmelisiniz"),
  acceptMarketing: Yup.boolean(),
  // Subscription bilgileri (optional, sadece bilgilendirme)
  planName: Yup.string().optional(),
  status: Yup.string().optional(),
  campusName: Yup.string().optional(),
  price: Yup.number().optional(),
  currency: Yup.string().optional(),
  daysRemaining: Yup.number().optional(),
});

/**
 * Tüm formun validation schema'sı
 */
export const registerValidationSchema = Yup.object({
  loginCredentials: loginCredentialsSchema,
  personalInfo: personalInfoSchema,
  verificationCode: verificationCodeSchema,
  campusInfo: campusInfoSchema,
  packageSelection: packageSelectionSchema,
  paymentInfo: paymentInfoSchema,
});
