/**
 * Step configuration constants for appointment creation context
 * Bu dosya context'te kullanılan step konfigürasyonlarını içerir
 */

import { FormStep } from "../types/form-data-types";
import { FormStepConfig } from "../types/step-config-types";

// =============================================================================
// CONTEXT STEP CONFIGURATION
// =============================================================================

/**
 * Step configuration for appointment creation context
 * Context'te kullanılan adım tanımları
 */
export const CONTEXT_STEP_CONFIG: readonly FormStepConfig[] = [
  {
    key: FormStep.APPOINTMENT_TYPE,
    title: "Randevu Türü",
    icon: "ph-calendar",
  },
  {
    key: FormStep.STUDENT_INFO,
    title: "Öğrenci Bilgileri",
    icon: "ph-student",
  },
  {
    key: FormStep.DATE_TIME,
    title: "Tarih & Saat",
    icon: "ph-clock",
  },
  {
    key: FormStep.CONFIRMATION,
    title: "Onay",
    icon: "ph-check-circle",
  },
] as const;

/**
 * Step configuration with icons for UI components
 */
export const STEP_CONFIG_WITH_ICONS = CONTEXT_STEP_CONFIG;

/**
 * Helper function to get step by key
 */
export const getStepByKey = (key: FormStep): FormStepConfig | undefined => {
  return CONTEXT_STEP_CONFIG.find((step) => step.key === key);
};

/**
 * Helper function to get step index
 */
export const getStepIndex = (key: FormStep): number => {
  return CONTEXT_STEP_CONFIG.findIndex((step) => step.key === key);
};
