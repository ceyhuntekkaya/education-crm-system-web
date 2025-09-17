/**
 * Step management utility functions for appointment creation
 */

import { FormStep } from "../types";
import { validateEmail, validatePhone, validateAge } from "./validation-utils";

/**
 * Gets step order number
 */
export const getStepOrder = (step: FormStep): number => {
  const stepOrder = {
    [FormStep.APPOINTMENT_TYPE]: 1,
    [FormStep.DATE_TIME]: 2,
    [FormStep.PERSONAL_INFO]: 3,
    [FormStep.STUDENT_INFO]: 4,
    [FormStep.CONFIRMATION]: 5,
  };

  return stepOrder[step] || 0;
};

/**
 * Calculates progress percentage
 */
export const calculateProgress = (
  currentStep: FormStep,
  totalSteps: number
): number => {
  const currentOrder = getStepOrder(currentStep);
  return Math.round((currentOrder / totalSteps) * 100);
};

/**
 * Checks if step is completed based on form data
 */
export const isStepCompleted = (step: FormStep, formData: any): boolean => {
  switch (step) {
    case FormStep.APPOINTMENT_TYPE:
      return !!formData.appointmentType;

    case FormStep.DATE_TIME:
      return !!formData.appointmentDate && !!formData.startTime;

    case FormStep.PERSONAL_INFO:
      return !!(
        formData.parentName &&
        formData.parentEmail &&
        validateEmail(formData.parentEmail) &&
        formData.parentPhone &&
        validatePhone(formData.parentPhone)
      );

    case FormStep.STUDENT_INFO:
      return !!(
        formData.studentName &&
        formData.studentAge &&
        validateAge(formData.studentAge) &&
        formData.gradeInterested
      );

    case FormStep.CONFIRMATION:
      return formData.agreedToTerms === true;

    default:
      return false;
  }
};

/**
 * Gets next available step
 */
export const getNextStep = (currentStep: FormStep): FormStep | null => {
  const steps = Object.values(FormStep);
  const currentIndex = steps.indexOf(currentStep);

  if (currentIndex < steps.length - 1) {
    return steps[currentIndex + 1];
  }

  return null;
};

/**
 * Gets previous step
 */
export const getPreviousStep = (currentStep: FormStep): FormStep | null => {
  const steps = Object.values(FormStep);
  const currentIndex = steps.indexOf(currentStep);

  if (currentIndex > 0) {
    return steps[currentIndex - 1];
  }

  return null;
};
