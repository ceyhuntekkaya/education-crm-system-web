export * from "./types";
export * from "./schemas";
export * from "./constants";
export * from "./sections";
export * from "./components";

// Context exports (useRegister hook for consuming the context)
export { RegisterProvider, useRegister } from "./context";

// Hooks exports (explicitly export without useRegister to avoid conflict)
export {
  useRegisterSteps,
  useStepValidation,
  useRegistrationSubmit,
  useVerificationFlow,
} from "./hooks";
