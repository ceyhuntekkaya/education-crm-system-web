/**
 * Step configuration constants for appointment creation
 * Register form mimarisini takip eder
 */

export interface StepConfig {
  step: number;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

/**
 * Appointment creation steps - Tüm adımlar
 */
export const APPOINTMENT_STEPS: StepConfig[] = [
  {
    step: 1,
    title: "Randevu Türü",
    description: "Randevu türünü seçin",
    icon: "ph-calendar-check",
    isCompleted: false,
    isActive: true,
  },
  {
    step: 2,
    title: "Tarih ve Saat",
    description: "Randevu tarihi ve saatini seçin",
    icon: "ph-clock",
    isCompleted: false,
    isActive: false,
  },
  {
    step: 3,
    title: "Öğrenci Bilgileri",
    description: "Öğrenci bilgilerini girin",
    icon: "ph-student",
    isCompleted: false,
    isActive: false,
  },
  {
    step: 4,
    title: "Onay",
    description: "Bilgileri kontrol edin ve onaylayın",
    icon: "ph-check-circle",
    isCompleted: false,
    isActive: false,
  },
];

/**
 * Get step configurations
 */
export const getStepConfigs = (): StepConfig[] => {
  return APPOINTMENT_STEPS;
};

/**
 * Get total number of steps
 */
export const getTotalSteps = (): number => {
  return APPOINTMENT_STEPS.length;
};

/**
 * Get step by number
 */
export const getStepByNumber = (stepNumber: number): StepConfig | undefined => {
  return APPOINTMENT_STEPS.find((step) => step.step === stepNumber);
};

/**
 * Get step index (0-based)
 */
export const getStepIndex = (stepNumber: number): number => {
  return stepNumber - 1;
};
