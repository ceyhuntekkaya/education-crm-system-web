import { useEffect } from "react";
import { useFormHook } from "@/hooks/use-form-hook";
import { createContextInitialFormData } from "../schemas/form-initialization-schema";

export interface UseAppointmentFormDataReturn {
  // Initialization methods only
  initializeForm: () => void;
  resetToInitialState: (schoolId: number, isOnline: boolean) => void;
}

export const useAppointmentFormData = (
  schoolId: number,
  isOnline: boolean = false
): UseAppointmentFormDataReturn => {
  const { resetForm, updateFields } = useFormHook();

  // Initialize form with default values
  const initializeForm = () => {
    const initialFormData = createContextInitialFormData(schoolId, isOnline);
    updateFields(initialFormData);
  };

  // Initialize on mount and when props change
  useEffect(() => {
    const initialFormData = createContextInitialFormData(schoolId, isOnline);
    updateFields(initialFormData);
  }, [schoolId, isOnline, updateFields]);

  const resetToInitialState = (newSchoolId: number, newIsOnline: boolean) => {
    const initialFormData = createContextInitialFormData(
      newSchoolId,
      newIsOnline
    );
    resetForm();
    updateFields(initialFormData);
  };

  return {
    // Initialization methods only
    initializeForm,
    resetToInitialState,
  };
};
