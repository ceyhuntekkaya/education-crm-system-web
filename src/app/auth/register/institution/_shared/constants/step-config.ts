import { StepConfig } from "../types";
import type { RegistrationType } from "../register-form";
import { UserType } from "@/enums/UserType";

/**
 * Kurum kayıt adımları (tüm adımlar)
 */
const INSTITUTION_STEPS: StepConfig[] = [
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
  // {
  //   step: 6,
  //   title: "Ödeme Bilgileri",
  //   description: "Ödeme ve sözleşme bilgileri",
  //   icon: "ph-credit-card",
  //   isCompleted: false,
  //   isActive: false,
  // },
  {
    step: 6,
    title: "Tamamlandı",
    description: "Kayıt başarıyla tamamlandı",
    icon: "ph-check-circle",
    isCompleted: false,
    isActive: false,
  },
];

/**
 * Kullanıcı (veli) kayıt adımları (sadece temel adımlar)
 */
const USER_STEPS: StepConfig[] = [
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
    title: "Tamamlandı",
    description: "Kayıt başarıyla tamamlandı",
    icon: "ph-check-circle",
    isCompleted: false,
    isActive: false,
  },
];

/**
 * Kayıt tipine göre adımları döndürür
 */
export const getStepConfigs = (
  registrationType: RegistrationType
): StepConfig[] => {
  return registrationType === UserType.INSTITUTION_USER
    ? INSTITUTION_STEPS
    : USER_STEPS;
};

/**
 * Toplam adım sayısını döndürür
 */
export const getTotalSteps = (registrationType: RegistrationType): number => {
  return getStepConfigs(registrationType).length;
};

/**
 * Varsayılan adımlar (geriye dönük uyumluluk için)
 */
export const STEP_CONFIGS = INSTITUTION_STEPS;
export const TOTAL_STEPS = INSTITUTION_STEPS.length;
