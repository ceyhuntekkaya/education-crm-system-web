import type { StepConfig } from "../types/register.types";
import { UserType } from "@/enums/UserType";

type TeacherInstructorType = UserType.TEACHER | UserType.INSTRUCTOR;

/**
 * Öğretmen / Eğitmen kayıt adımları (Eğitim Kurumu kaydı ile aynı yapı)
 */
const TEACHER_INSTRUCTOR_STEPS: StepConfig[] = [
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
    title: "Tamamlandı",
    description: "Kayıt başarıyla tamamlandı",
    icon: "ph-check-circle",
    isCompleted: false,
    isActive: false,
  },
];

/**
 * Kayıt tipine göre adımları döndürür (Öğretmen ve Eğitmen aynı adımları kullanır)
 */
export const getStepConfigs = (
  _registrationType: TeacherInstructorType,
): StepConfig[] => {
  return TEACHER_INSTRUCTOR_STEPS;
};

/**
 * Toplam adım sayısını döndürür
 */
export const getTotalSteps = (
  _registrationType: TeacherInstructorType,
): number => {
  return TEACHER_INSTRUCTOR_STEPS.length;
};

export const STEP_CONFIGS = TEACHER_INSTRUCTOR_STEPS;
export const TOTAL_STEPS = TEACHER_INSTRUCTOR_STEPS.length;
