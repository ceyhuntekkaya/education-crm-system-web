/**
 * Validation utility functions for appointment creation
 */

import { VALIDATION_RULES, ERROR_MESSAGES } from "../constants";

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Validates phone number format (Turkish format)
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  return VALIDATION_RULES.PHONE_REGEX.test(phone);
};

/**
 * Validates name fields
 */
export const validateName = (name: string): boolean => {
  if (!name) return false;
  const trimmedName = name.trim();
  return (
    trimmedName.length >= VALIDATION_RULES.NAME_MIN_LENGTH &&
    trimmedName.length <= VALIDATION_RULES.NAME_MAX_LENGTH
  );
};

/**
 * Validates age range
 */
export const validateAge = (age: number): boolean => {
  return age >= VALIDATION_RULES.MIN_AGE && age <= VALIDATION_RULES.MAX_AGE;
};

/**
 * Validates date is not in the past
 */
export const validateFutureDate = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

/**
 * Validates birth date for student age
 */
export const validateStudentBirthDate = (birthDate: Date): boolean => {
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return (
      age - 1 >= VALIDATION_RULES.MIN_AGE && age - 1 <= VALIDATION_RULES.MAX_AGE
    );
  }

  return age >= VALIDATION_RULES.MIN_AGE && age <= VALIDATION_RULES.MAX_AGE;
};

/**
 * Calculates age from birth date
 */
export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

/**
 * Generates error message for validation failures
 */
export const getValidationErrorMessage = (
  field: string,
  value: any
): string => {
  switch (field) {
    case "parentEmail":
      return !value
        ? ERROR_MESSAGES.REQUIRED_FIELD
        : ERROR_MESSAGES.INVALID_EMAIL;
    case "parentPhone":
      return !value
        ? ERROR_MESSAGES.REQUIRED_FIELD
        : ERROR_MESSAGES.INVALID_PHONE;
    case "parentName":
    case "studentName":
      return ERROR_MESSAGES.REQUIRED_FIELD;
    case "appointmentDate":
      return ERROR_MESSAGES.DATE_SELECTION_ERROR;
    case "studentAge":
      return ERROR_MESSAGES.INVALID_AGE;
    case "studentBirthDate":
      return ERROR_MESSAGES.INVALID_BIRTH_DATE;
    case "agreedToTerms":
      return ERROR_MESSAGES.TERMS_NOT_ACCEPTED;
    default:
      return ERROR_MESSAGES.VALIDATION_ERROR;
  }
};
