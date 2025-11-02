import { PasswordChangeFormData } from "../types";

/**
 * Get initial values for password change form
 */
export const getInitialValues = (): PasswordChangeFormData => {
  return {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
};

/**
 * Initial values for password change form (backward compatibility)
 */
export const initialValues: PasswordChangeFormData = getInitialValues();
