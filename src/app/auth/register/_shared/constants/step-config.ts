import { StepConfig } from "../types";

/**
 * Stepper adımlarının konfigürasyonu
 */
export const STEP_CONFIGS: StepConfig[] = [
  {
    step: 1,
    title: "Giriş Bilgileri",
    description: "Kullanıcı adı ve şifre belirleyin",
    icon: "ph-user-circle",
    isCompleted: false,
    isActive: true,
  },
  {
    step: 2,
    title: "Kişisel Bilgiler",
    description: "Ad, soyad ve iletişim bilgileriniz",
    icon: "ph-identification-card",
    isCompleted: false,
    isActive: false,
  },
  {
    step: 3,
    title: "Doğrulama",
    description: "E-posta doğrulama kodu",
    icon: "ph-shield-check",
    isCompleted: false,
    isActive: false,
  },
  {
    step: 4,
    title: "Kampüs Bilgileri",
    description: "Kampüs ve lokasyon detayları",
    icon: "ph-buildings",
    isCompleted: false,
    isActive: false,
  },
  {
    step: 5,
    title: "Paket Seçimi",
    description: "Size uygun paketi seçin",
    icon: "ph-package",
    isCompleted: false,
    isActive: false,
  },
  {
    step: 6,
    title: "Ödeme Bilgileri",
    description: "Ödeme ve sözleşme bilgileri",
    icon: "ph-credit-card",
    isCompleted: false,
    isActive: false,
  },
];

/**
 * Toplam adım sayısı
 */
export const TOTAL_STEPS = STEP_CONFIGS.length;
