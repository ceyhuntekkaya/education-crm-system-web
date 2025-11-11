"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { RegisterContextType } from "../types/context-types";
import {
  useRegisterSteps,
  useStepValidation,
  useStepNavigation,
  useVerificationFlow,
  useLocationData,
  useBrandData,
  useFormPrefill,
  useRegisterStep1,
  useRegisterStep2,
  useRegisterStep3,
  useRegisterStep4,
  useRegisterStep5,
  useRegisterStep6,
  useRegisterStep7,
} from "../hooks";
import { useSubscriptionPlans } from "@/app/(public)/memberships/_shared/hooks";
import { useForm } from "@/contexts/form-context";
import { useSnackbar } from "@/contexts/snackbar-context";
import type { RegistrationType } from "../register-form";
import { UserType } from "@/enums/UserType";

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined
);

interface RegisterProviderProps {
  children: React.ReactNode;
  registrationType?: RegistrationType;
}

export const RegisterProvider: React.FC<RegisterProviderProps> = ({
  children,
  registrationType = UserType.INSTITUTION_USER,
}) => {
  // User ID state (backend'den dönen)
  const [userId, setUserId] = useState<number | null>(null);

  // Form values
  const { values } = useForm();
  const { showSnackbar } = useSnackbar();

  // Location data hook
  const locationData = useLocationData(values);

  // Brand data hook
  const brandData = useBrandData();

  // Subscription plans hook
  const { subscriptionPlans, loading: plansLoading } = useSubscriptionPlans();

  // Form prefill hook - URL'den stepId geldiğinde user bilgileriyle formu doldurur
  useFormPrefill(subscriptionPlans, plansLoading);

  // Custom hooks - her biri tek bir sorumluluktan sorumlu
  const { currentStep, setCurrentStep, nextStep, previousStep, goToStep } =
    useRegisterSteps(registrationType);

  const { isStepCompleted, canProceedToNextStep } = useStepValidation();

  const { handleStepClick, isStepClickable } = useStepNavigation(
    currentStep,
    isStepCompleted,
    goToStep
  );

  // isSubmitting state'i step loading'lerinden gelecek

  const {
    sendVerificationCode,
    verifyCode,
    isVerifying,
    verificationError,
    codeSent,
    resendTimer,
    inputRefs,
    fullCode,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeValue,
  } = useVerificationFlow();

  // Register API artık kullanılmıyor, step-by-step API'ler kullanılıyor

  // Step hooks - Her step için ayrı API hook
  const { submitCredential, isLoading: step1Loading } = useRegisterStep1();
  const { submitIdentity, isLoading: step2Loading } = useRegisterStep2();
  const { submitConfirm, isLoading: step3Loading } = useRegisterStep3();
  const { submitCampus, isLoading: step4Loading } = useRegisterStep4();
  const { submitSubscription, isLoading: step5Loading } = useRegisterStep5();
  const { submitPayment, isLoading: step6Loading } = useRegisterStep6();
  const { submitVerification, isLoading: step7Loading } = useRegisterStep7();

  // Step submit functions
  const handleSubmitStep1 = useCallback(async () => {
    if (!values?.loginCredentials) return;
    
    // Backend: RegisterCredentialDto (email, password, passwordControl)
    const payload = {
      email: values.loginCredentials.email || "",
      password: values.loginCredentials.password || "",
      passwordControl: values.loginCredentials.confirmPassword || "",
    };

    const response = await submitCredential(payload);
    if (response?.data?.id) {
      setUserId(response.data.id);
      // Email'i personalInfo'ya da kaydet (Step 2'de email backend'e gönderiliyor)
      if (values.loginCredentials.email && values.personalInfo) {
        values.personalInfo.email = values.loginCredentials.email;
      }
      showSnackbar("Giriş bilgileri kaydedildi", "success");
      nextStep();
    }
  }, [values, submitCredential, showSnackbar, nextStep]);

  const handleSubmitStep2 = useCallback(async () => {
    if (!userId || !values?.personalInfo) return;
    
    // Backend: RegisterIdentityDto (userId, firstName, lastName, phone)
    const payload = {
      userId,
      firstName: values.personalInfo.firstName || "",
      lastName: values.personalInfo.lastName || "",
      phone: values.personalInfo.phone || "",
    };

    const response = await submitIdentity(payload);
    if (response?.success) {
      showSnackbar("Kişisel bilgiler kaydedildi", "success");
      nextStep();
    }
  }, [userId, values, submitIdentity, showSnackbar, nextStep]);

  const handleSubmitStep3 = useCallback(async () => {
    if (!userId || !fullCode || fullCode.length !== 4) return;
    
    // Backend: RegisterConfirmDto (userId, code)
    const payload = {
      userId,
      code: fullCode,
    };

    const response = await submitConfirm(payload);
    if (response?.success) {
      showSnackbar("Doğrulama başarılı", "success");
      nextStep();
    }
  }, [userId, fullCode, submitConfirm, showSnackbar, nextStep]);

  const handleSubmitStep4 = useCallback(async () => {
    if (!userId || !values?.campusInfo) return;
    
    // Backend: RegisterCampusDto (userId, brandId, name, email, phone, addressLine1, addressLine2, districtId, postalCode, countryId, provinceId)
    const payload = {
      userId,
      brandId: values.campusInfo.brandId || 0,
      name: values.campusInfo.campusName || "",
      email: values.personalInfo?.email || "",
      phone: values.personalInfo?.phone || "",
      addressLine1: values.campusInfo.addressLine1 || "",
      addressLine2: values.campusInfo.addressLine2 || "",
      districtId: values.campusInfo.districtId || 0,
      postalCode: values.campusInfo.postalCode || "",
      countryId: values.campusInfo.countryId || 0,
      provinceId: values.campusInfo.provinceId || 0,
    };

    const response = await submitCampus(payload);
    if (response?.success) {
      showSnackbar("Kampüs bilgileri kaydedildi", "success");
      nextStep();
    }
  }, [userId, values, submitCampus, showSnackbar, nextStep]);

  const handleSubmitStep5 = useCallback(async () => {
    if (!userId || !values?.packageSelection?.selectedPlanId) return;
    
    // Backend: RegisterSubscriptionDto (userId, subscriptionId)
    const payload = {
      userId,
      subscriptionId: parseInt(values.packageSelection.selectedPlanId),
    };

    const response = await submitSubscription(payload);
    if (response?.success) {
      showSnackbar("Paket seçimi kaydedildi", "success");
      nextStep();
    }
  }, [userId, values, submitSubscription, showSnackbar, nextStep]);

  const handleSubmitStep6 = useCallback(async () => {
    if (!userId || !values?.packageSelection?.selectedPlanId) return;
    
    // Backend: RegisterPaymentDto (userId, subscriptionId)
    const payload = {
      userId,
      subscriptionId: parseInt(values.packageSelection.selectedPlanId),
    };

    const response = await submitPayment(payload);
    if (response?.success) {
      showSnackbar("Ödeme bilgileri kaydedildi", "success");
      nextStep(); // Step 7'ye geç
    }
  }, [userId, values, submitPayment, showSnackbar, nextStep]);

  // Internal submit function with return value
  const handleSubmitStep7WithResponse = useCallback(async () => {
    if (!userId) return null;
    
    // Backend: RegisterVerificationDto (userId)
    const payload = {
      userId,
    };

    const response = await submitVerification(payload);
    if (response?.success) {
      showSnackbar("Kayıt işlemi başarıyla tamamlandı!", "success");
      // Step 7 son adım, success page gösterilecek (nextStep çağrılmaz)
    }
    return response || null;
  }, [userId, submitVerification, showSnackbar]);

  // Void wrapper for submitStep7
  const handleSubmitStep7 = useCallback(async () => {
    await handleSubmitStep7WithResponse();
  }, [handleSubmitStep7WithResponse]);

  // Context value
  const contextValue: RegisterContextType = {
    // Form data
    formData: values as any,

    // Registration type
    registrationType,

    // User ID
    userId,
    setUserId,

    // Step management
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    goToStep,

    // Validation
    isStepCompleted,
    isStepClickable,
    canProceedToNextStep: () => canProceedToNextStep(currentStep),

    // Loading states
    isLoading: step1Loading || step2Loading || step3Loading || step4Loading || step5Loading || step6Loading || step7Loading,
    isVerifying,
    isSubmitting: step1Loading || step2Loading || step3Loading || step4Loading || step5Loading || step6Loading || step7Loading,

    // Errors
    error: verificationError,
    verificationError,

    // Verification UI State
    codeSent,
    resendTimer,
    inputRefs,
    fullCode,

    // Location data
    locationData,

    // Brand data
    brandData,

    // Subscription plans data
    subscriptionPlans,
    plansLoading,

    // Step Actions
    submitStep1: handleSubmitStep1,
    submitStep2: handleSubmitStep2,
    submitStep3: handleSubmitStep3,
    submitStep4: handleSubmitStep4,
    submitStep5: handleSubmitStep5,
    submitStep6: handleSubmitStep6,
    submitStep7: handleSubmitStep7,

    // Actions
    updateFormData: () => {}, // FormProvider handles this
    sendVerificationCode,
    verifyCode,
    submitRegistration: handleSubmitStep7WithResponse, // Son adımda çağrılacak (legacy uyumluluk için)
    handleStepClick,

    // Verification UI Handlers
    handleInputChange,
    handleKeyDown,
    handlePaste,
    getCodeValue,
  };

  return (
    <RegisterContext.Provider value={contextValue}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextType => {
  const context = useContext(RegisterContext);
  if (context === undefined) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};
