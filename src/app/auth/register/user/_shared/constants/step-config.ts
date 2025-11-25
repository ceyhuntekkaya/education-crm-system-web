import { StepConfig } from "../types";
import { UserType } from "@/enums/UserType";

type RegistrationType = UserType;

/**
 * Veli kayıt adımları (sadece 4 adım: Giriş, Kişisel Bilgiler, Doğrulama, Success)
 */
const USER_STEPS: StepConfig[] = [
  {
    step: 1,
    title: "Giriş Bilgileri",
    description: "E-posta ve şifre belirleyin",
    icon: "ph-user-circle",
    isCompleted: false,
    isActive: true,
  },
  {
    step: 2,
    title: "Kişisel Bilgiler",
    description: "Ad, soyad ve telefon bilgileriniz",
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
    description: "Kayıt işlemi başarılı",
    icon: "ph-check-circle",
    isCompleted: false,
    isActive: false,
  },
];

/**
 * Kayıt tipine göre uygun adımları döndürür
 */
export const getStepsByRegistrationType = (
  registrationType: RegistrationType
): StepConfig[] => {
  return USER_STEPS;
};

/**
 * Toplam adım sayısını döndürür
 */
export const getTotalSteps = (registrationType: RegistrationType): number => {
  return USER_STEPS.length;
};

export { USER_STEPS };
