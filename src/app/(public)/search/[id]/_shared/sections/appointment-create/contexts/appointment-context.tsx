"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useFormHook } from "@/hooks/use-form-hook";
import {
  FormStep,
  AppointmentCreateFormData,
  AppointmentCreationResult,
} from "../types";
import { AppointmentCreateDto } from "@/types/dto/appointment/AppointmentCreateDto";

// Step Configuration
const STEP_CONFIG = [
  {
    key: FormStep.APPOINTMENT_TYPE,
    title: "Randevu Türü",
    icon: "ph-calendar",
  },
  { key: FormStep.DATE_TIME, title: "Tarih & Saat", icon: "ph-clock" },
  { key: FormStep.PERSONAL_INFO, title: "Veli Bilgileri", icon: "ph-user" },
  {
    key: FormStep.STUDENT_INFO,
    title: "Öğrenci Bilgileri",
    icon: "ph-student",
  },
  { key: FormStep.CONFIRMATION, title: "Onay", icon: "ph-check-circle" },
] as const;

// Context Types
interface AppointmentContextState {
  // Appointment info
  schoolId: number;
  isOnline: boolean;

  // Steps
  currentStep: FormStep;
  steps: typeof STEP_CONFIG;
  currentStepIndex: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  visitedSteps: Set<FormStep>;

  // Form data
  formData: Partial<AppointmentCreateFormData>;
  errors: Record<string, string | undefined>;
  isValid: boolean;
  isDirty: boolean;

  // Submission
  isSubmitting: boolean;
  submissionResult: AppointmentCreationResult | null;
}

interface AppointmentContextActions {
  // Step navigation
  goToStep: (step: FormStep) => void;
  goToNextStep: () => Promise<boolean>;
  goToPreviousStep: () => void;
  markStepAsVisited: (step: FormStep) => void;

  // Form operations
  setFieldValue: (name: string, value: any) => Promise<void>;
  getFieldValue: (name: string) => any;
  getFieldError: (name: string) => string | undefined;
  setFieldError: (name: string, error: string | undefined) => void;

  // Validation
  validateStep: (step: FormStep) => Promise<boolean>;
  validateForm: () => Promise<boolean>;

  // Submission
  submitForm: () => Promise<void>;
  resetAppointment: () => void;
}

interface AppointmentContextValue
  extends AppointmentContextState,
    AppointmentContextActions {}

interface AppointmentProviderProps {
  children: ReactNode;
  schoolId: number;
  isOnline?: boolean;
}

// Context
const AppointmentContext = createContext<AppointmentContextValue | undefined>(
  undefined
);

// Provider Component
export const AppointmentProvider: React.FC<AppointmentProviderProps> = ({
  children,
  schoolId,
  isOnline = false,
}) => {
  // Form hook integration
  const {
    values,
    errors,
    isValid,
    isDirty,
    updateField,
    getFieldValue,
    getFieldError,
    setFieldError,
    validateForm: validateFormData,
    resetForm: resetFormData,
    updateFields,
  } = useFormHook();

  // Steps state
  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.APPOINTMENT_TYPE
  );
  const [visitedSteps, setVisitedSteps] = useState<Set<FormStep>>(
    new Set([FormStep.APPOINTMENT_TYPE])
  );

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] =
    useState<AppointmentCreationResult | null>(null);

  // Initialize form with default values
  React.useEffect(() => {
    const initialFormData: Partial<AppointmentCreateFormData> = {
      // Props from parent component
      schoolId,
      isOnline,

      // DTO fields with defaults
      appointmentSlotId: undefined,
      parentUserId: undefined,
      appointmentDate: undefined,
      startTime: undefined,
      endTime: undefined,
      appointmentType: undefined,
      title: undefined,
      description: undefined,
      location: undefined,
      parentName: undefined,
      parentEmail: undefined,
      parentPhone: undefined,
      studentName: undefined,
      studentAge: undefined,
      studentBirthDate: undefined,
      studentGender: undefined,
      currentSchool: undefined,
      gradeInterested: undefined,
      specialRequests: undefined,
      notes: undefined,
      participants: undefined,

      // Form-specific fields
      communicationPreference: "EMAIL",
      agreedToTerms: false,
      selectedSlotId: undefined,
      timeSlotData: undefined,
    };

    updateFields(initialFormData);
  }, [schoolId, isOnline, updateFields]);

  // Computed values
  const currentStepIndex = useMemo(() => {
    return STEP_CONFIG.findIndex((step) => step.key === currentStep);
  }, [currentStep]);

  const isFirstStep = useMemo(() => {
    return currentStepIndex === 0;
  }, [currentStepIndex]);

  const isLastStep = useMemo(() => {
    return currentStepIndex === STEP_CONFIG.length - 1;
  }, [currentStepIndex]);

  // Step validation
  const validateStep = useCallback(
    async (step: FormStep): Promise<boolean> => {
      const stepErrors: Record<string, string> = {};

      switch (step) {
        case FormStep.APPOINTMENT_TYPE:
          const appointmentType = getFieldValue("appointmentType");
          if (!appointmentType) {
            stepErrors.appointmentType = "Randevu türü seçilmelidir.";
          }
          break;

        case FormStep.DATE_TIME:
          if (!getFieldValue("appointmentDate")) {
            stepErrors.appointmentDate = "Tarih seçilmelidir.";
          }
          if (!getFieldValue("selectedSlotId")) {
            stepErrors.selectedSlotId = "Saat seçilmelidir.";
          }
          break;

        case FormStep.PERSONAL_INFO:
          if (!getFieldValue("parentName")?.trim()) {
            stepErrors.parentName = "Ad soyad zorunludur.";
          }
          if (!getFieldValue("parentEmail")?.trim()) {
            stepErrors.parentEmail = "E-posta zorunludur.";
          } else if (!/\S+@\S+\.\S+/.test(getFieldValue("parentEmail"))) {
            stepErrors.parentEmail = "Geçerli bir e-posta adresi giriniz.";
          }
          if (!getFieldValue("parentPhone")?.trim()) {
            stepErrors.parentPhone = "Telefon numarası zorunludur.";
          }
          break;

        case FormStep.STUDENT_INFO:
          if (!getFieldValue("studentName")?.trim()) {
            stepErrors.studentName = "Öğrenci adı zorunludur.";
          }
          const age = getFieldValue("studentAge");
          if (!age || age < 3 || age > 18) {
            stepErrors.studentAge = "Öğrenci yaşı 3-18 arasında olmalıdır.";
          }
          if (!getFieldValue("gradeInterested")?.trim()) {
            stepErrors.gradeInterested = "İlgilenilen sınıf seçilmelidir.";
          }
          break;

        case FormStep.CONFIRMATION:
          if (!getFieldValue("agreedToTerms")) {
            stepErrors.agreedToTerms = "Kullanım şartlarını kabul etmelisiniz.";
          }
          break;
      }

      // Set step errors
      Object.keys(stepErrors).forEach((field) => {
        setFieldError(field, stepErrors[field]);
      });

      const isValid = Object.keys(stepErrors).length === 0;
      return isValid;
    },
    [getFieldValue, setFieldError]
  );

  // Step navigation
  const goToStep = useCallback((step: FormStep) => {
    setCurrentStep(step);
    setVisitedSteps((prev) => new Set(prev).add(step));
  }, []);

  const goToNextStep = useCallback(async (): Promise<boolean> => {
    if (!isLastStep) {
      const nextStep = STEP_CONFIG[currentStepIndex + 1].key;
      goToStep(nextStep);
      return true;
    }

    return true;
  }, [currentStepIndex, isLastStep, goToStep]);

  const goToPreviousStep = useCallback(() => {
    if (!isFirstStep) {
      const previousStep = STEP_CONFIG[currentStepIndex - 1].key;
      goToStep(previousStep);
    }
  }, [currentStepIndex, isFirstStep, goToStep]);

  const markStepAsVisited = useCallback((step: FormStep) => {
    setVisitedSteps((prev) => new Set(prev).add(step));
  }, []);

  // Form submission
  const submitForm = useCallback(async () => {
    try {
      setIsSubmitting(true);

      // Final validation
      const isFormValid = await validateFormData();
      if (!isFormValid) {
        throw new Error("Form validation failed");
      }

      // Create DTO
      const formData = values as AppointmentCreateFormData;
      const appointmentDto: AppointmentCreateDto = {
        // Required fields
        schoolId: formData.schoolId!,
        appointmentType: formData.appointmentType!,
        appointmentSlotId: formData.selectedSlotId!,
        parentName: formData.parentName!,
        parentEmail: formData.parentEmail!,
        parentPhone: formData.parentPhone!,
        studentName: formData.studentName!,
        studentAge: formData.studentAge!,
        gradeInterested: formData.gradeInterested!,
        isOnline: formData.isOnline!,

        // Optional fields from form
        appointmentDate: formData.appointmentDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        studentBirthDate: formData.studentBirthDate,
        studentGender: formData.studentGender,
        currentSchool: formData.currentSchool,
        specialRequests: formData.specialRequests,
        notes: formData.notes,
        parentUserId: formData.parentUserId,
        participants: formData.participants,
      };

      // TODO: Implement actual API call
      // const response = await appointmentService.createPublicAppointment(appointmentDto);

      // Mock response for now
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      const response = {
        success: true,
        appointmentNumber: `APT-${Date.now()}`,
        message: "Randevunuz başarıyla oluşturuldu!",
      };

      const result: AppointmentCreationResult = {
        success: response.success,
        appointmentNumber: response.appointmentNumber,
        message: response.message,
      };

      setSubmissionResult(result);

      // Success handled by the result state
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Randevu oluşturulurken bir hata oluştu.";

      const result: AppointmentCreationResult = {
        success: false,
        error: errorMessage,
      };

      setSubmissionResult(result);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateFormData]);

  // Reset appointment
  const resetAppointment = useCallback(() => {
    resetFormData();
    setCurrentStep(FormStep.APPOINTMENT_TYPE);
    setVisitedSteps(new Set([FormStep.APPOINTMENT_TYPE]));
    setIsSubmitting(false);
    setSubmissionResult(null);
    updateFields({
      schoolId,
      isOnline,
      communicationPreference: "EMAIL",
      agreedToTerms: false,
    });
  }, [resetFormData, updateFields, schoolId, isOnline]);

  // Context Value
  const contextValue: AppointmentContextValue = {
    // Appointment info
    schoolId,
    isOnline,

    // Steps
    currentStep,
    steps: STEP_CONFIG,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    visitedSteps,

    // Form data
    formData: values as Partial<AppointmentCreateFormData>,
    errors,
    isValid,
    isDirty,

    // Submission
    isSubmitting,
    submissionResult,

    // Step navigation
    goToStep,
    goToNextStep,
    goToPreviousStep,
    markStepAsVisited,

    // Form operations
    setFieldValue: updateField,
    getFieldValue,
    getFieldError,
    setFieldError,

    // Validation
    validateStep,
    validateForm: validateFormData,

    // Submission
    submitForm,
    resetAppointment,
  };

  return (
    <AppointmentContext.Provider value={contextValue}>
      {children}
    </AppointmentContext.Provider>
  );
};

// Hook
export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useAppointment must be used within an AppointmentProvider"
    );
  }
  return context;
};
