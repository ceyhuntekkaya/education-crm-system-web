export { AppointmentCreate } from "./appointment-create";
export * from "./components";
export * from "./sections";
export * from "./contexts";
export * from "./config";
export * from "./utils";

// Export constants (these have renamed types to avoid conflicts)
export * from "./constants";

// Export only specific types to avoid naming conflicts
export type {
  AppointmentCreateFormData,
  FormStep,
  AppointmentCreationResult,
  AppointmentContextValue,
  AppointmentProviderProps,
  FormStepConfig,
} from "./types";

// Export enums with aliases to avoid conflicts with main enums
export {
  StudentGender as AppointmentStudentGender,
  ParticipantType as AppointmentParticipantType,
  GradeLevel as AppointmentGradeLevel,
} from "./types/enum-types";
