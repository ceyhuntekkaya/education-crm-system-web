import { useEffect, useCallback, useRef, useMemo } from "react";
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

  // Track if this is the initial render to avoid infinite loops
  const isInitializedRef = useRef(false);
  const lastPropsRef = useRef({ schoolId, isOnline });

  // Initialize form with default values
  const initializeForm = useCallback(() => {
    const initialFormData = createContextInitialFormData(schoolId, isOnline);
    updateFields(initialFormData);
  }, [schoolId, isOnline, updateFields]);

  // Initialize on mount and when props change
  useEffect(() => {
    const propsChanged =
      lastPropsRef.current.schoolId !== schoolId ||
      lastPropsRef.current.isOnline !== isOnline;

    if (!isInitializedRef.current || propsChanged) {
      const initialFormData = createContextInitialFormData(schoolId, isOnline);
      updateFields(initialFormData);

      // Update refs
      isInitializedRef.current = true;
      lastPropsRef.current = { schoolId, isOnline };
    }
  }, [schoolId, isOnline, updateFields]);

  const resetToInitialState = useCallback(
    (newSchoolId: number, newIsOnline: boolean) => {
      const initialFormData = createContextInitialFormData(
        newSchoolId,
        newIsOnline
      );
      resetForm();
      updateFields(initialFormData);
    },
    [resetForm, updateFields]
  );

  // Memoize the return object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      // Initialization methods only
      initializeForm,
      resetToInitialState,
    }),
    [initializeForm, resetToInitialState]
  );
};
