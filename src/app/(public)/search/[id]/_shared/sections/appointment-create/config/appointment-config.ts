/**
 * Appointment form configuration
 */

export interface AppointmentFormConfig {
  // Form behavior
  autoAdvanceOnValid: boolean;
  showProgressBar: boolean;
  enableValidation: boolean;

  // Navigation
  allowSkipSteps: boolean;
  allowBackNavigation: boolean;

  // Submission
  autoSubmitOnLastStep: boolean;
  showConfirmationDialog: boolean;

  // UI preferences
  showStepNumbers: boolean;
  compactMode: boolean;

  // Communication defaults
  defaultCommunicationPreference: "EMAIL" | "PHONE" | "SMS";
  requireTermsAgreement: boolean;
}

export const DEFAULT_APPOINTMENT_CONFIG: AppointmentFormConfig = {
  autoAdvanceOnValid: false,
  showProgressBar: true,
  enableValidation: true,
  allowSkipSteps: false,
  allowBackNavigation: true,
  autoSubmitOnLastStep: false,
  showConfirmationDialog: true,
  showStepNumbers: true,
  compactMode: false,
  defaultCommunicationPreference: "EMAIL",
  requireTermsAgreement: true,
};

/**
 * Step configuration for appointment form
 */
export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  isOptional?: boolean;
  estimatedTimeMinutes?: number;
}

export const APPOINTMENT_STEP_CONFIGS: Record<string, StepConfig> = {
  APPOINTMENT_TYPE: {
    id: "appointment-type",
    title: "Randevu Tipi",
    description: "Hangi tür randevu almak istiyorsunuz?",
    estimatedTimeMinutes: 1,
  },
  DATE_TIME: {
    id: "date-time",
    title: "Tarih ve Saat",
    description: "Uygun tarih ve saati seçin",
    estimatedTimeMinutes: 2,
  },
  PERSONAL_INFO: {
    id: "personal-info",
    title: "Veli Bilgileri",
    description: "Veli iletişim bilgilerini girin",
    estimatedTimeMinutes: 3,
  },
  STUDENT_INFO: {
    id: "student-info",
    title: "Öğrenci Bilgileri",
    description: "Öğrenci ile ilgili detayları girin",
    estimatedTimeMinutes: 3,
  },
  CONFIRMATION: {
    id: "confirmation",
    title: "Onay",
    description: "Randevu detaylarını kontrol edin ve onaylayın",
    estimatedTimeMinutes: 1,
  },
};
