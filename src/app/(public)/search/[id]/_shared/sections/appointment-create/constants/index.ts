/**
 * Constants exports for appointment creation
 * Tüm sabit değerleri, enum'ları ve statik verileri export eder
 */

// Step configuration constants
export * from "./step-constants";

// Step config constants for context
// Re-export only the concrete constants and helpers from step-config-constants
// to avoid exporting the conflicting `StepConfig` interface name which
// is already exported by `step-constants.ts`.
export {
  APPOINTMENT_STEPS,
  getStepConfigs,
  getTotalSteps,
  getStepByNumber,
  getStepIndex,
} from "./step-config-constants";

// Student-related constants
export * from "./student-constants";

// Grade level constants
export * from "./grade-constants";

// Appointment type constants
export * from "./appointment-type-constants";

// Communication preference constants
export * from "./communication-constants";

// Form options constants
export * from "./form-options-constants";

// Validation constants
export * from "./validation-constants";
