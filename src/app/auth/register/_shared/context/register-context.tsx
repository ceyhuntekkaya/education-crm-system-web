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
import { useAuth } from "@/contexts/auth-context";
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
  const { user } = useAuth();

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
    console.log("🚀 handleSubmitStep2 çağrıldı:", {
      userId,
      personalInfo: values?.personalInfo,
    });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.personalInfo) {
      console.error("❌ Step 2 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasPersonalInfo: !!values?.personalInfo,
      });
      showSnackbar("Kullanıcı bilgisi bulunamadı", "error");
      return;
    }

    console.log("📤 Step 2 API isteği gönderiliyor:", {
      userId: effectiveUserId,
      firstName: values.personalInfo.firstName,
      lastName: values.personalInfo.lastName,
      phone: values.personalInfo.phone,
    });

    // Backend: RegisterIdentityDto (userId, firstName, lastName, phone)
    const payload = {
      userId: effectiveUserId,
      firstName: values.personalInfo.firstName || "",
      lastName: values.personalInfo.lastName || "",
      phone: values.personalInfo.phone || "",
    };

    const response = await submitIdentity(payload);
    console.log("📥 Step 2 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Kişisel bilgiler kaydedildi", "success");
      nextStep();
    } else {
      console.error("❌ Step 2 başarısız:", response);
      showSnackbar("Kişisel bilgiler kaydedilemedi", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, values, submitIdentity, showSnackbar, nextStep, setUserId]);

  const handleSubmitStep3 = useCallback(async () => {
    console.log("🚀 handleSubmitStep3 çağrıldı:", {
      userId,
      fullCode,
      verificationCode: values?.verificationCode,
    });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    // Verification code'u farklı kaynaklardan al
    let code = fullCode;

    // fullCode yoksa verificationCode objesinden digit1-4 değerlerini al
    if (!code || code.length !== 4) {
      const verificationObj = values?.verificationCode || {};
      code = [
        verificationObj.digit1,
        verificationObj.digit2,
        verificationObj.digit3,
        verificationObj.digit4,
      ]
        .filter(Boolean)
        .join("");

      // Hala yoksa code1-4 değerlerini al
      if (!code || code.length !== 4) {
        code = [
          verificationObj.code1,
          verificationObj.code2,
          verificationObj.code3,
          verificationObj.code4,
        ]
          .filter(Boolean)
          .join("");
      }
    }

    if (!effectiveUserId || !code || code.length !== 4) {
      console.error("❌ Step 3 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        fullCode,
        code,
        codeLength: code?.length,
      });
      showSnackbar("Doğrulama kodu eksik veya hatalı", "error");
      return;
    }

    console.log("📤 Step 3 API isteği gönderiliyor:", {
      userId: effectiveUserId,
      code,
    });

    // Backend: RegisterConfirmDto (userId, code)
    const payload = {
      userId: effectiveUserId,
      code,
    };

    const response = await submitConfirm(payload);
    console.log("📥 Step 3 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Doğrulama başarılı", "success");
      nextStep();
    } else {
      console.error("❌ Step 3 başarısız:", response);
      showSnackbar("Doğrulama başarısız", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userId,
    fullCode,
    values,
    submitConfirm,
    showSnackbar,
    nextStep,
    setUserId,
  ]);

  const handleSubmitStep4 = useCallback(async () => {
    console.log("🚀 handleSubmitStep4 çağrıldı:", {
      userId,
      campusInfo: values?.campusInfo,
      personalInfo: values?.personalInfo,
    });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.campusInfo) {
      console.error("❌ Step 4 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasCampusInfo: !!values?.campusInfo,
      });
      showSnackbar("Kampüs bilgileri eksik", "error");
      return;
    }

    console.log("📤 Step 4 API isteği gönderiliyor:", {
      userId: effectiveUserId,
      brandId: values.campusInfo.brandId,
      campusName: values.campusInfo.campusName,
      countryId: values.campusInfo.countryId,
      provinceId: values.campusInfo.provinceId,
      districtId: values.campusInfo.districtId,
      neighborhoodId: values.campusInfo.neighborhoodId,
    });

    // Backend: RegisterCampusDto - Backend string bekliyor, number göndermiyoruz!
    const payload: any = {
      userId: effectiveUserId,
      brandId: values.campusInfo.brandId || "",
      name: values.campusInfo.campusName || "",
      email: values.personalInfo?.email || "",
      phone: values.personalInfo?.phone || "",
      addressLine1: values.campusInfo.addressLine1 || "",
      addressLine2: values.campusInfo.addressLine2 || "",
      districtId: values.campusInfo.districtId || "",
      postalCode: values.campusInfo.postalCode || "",
      countryId: values.campusInfo.countryId || "",
      provinceId: values.campusInfo.provinceId || "",
    };

    // neighborhoodId varsa ekle (opsiyonel)
    // if (values.campusInfo.neighborhoodId) {
    //   payload.neighborhoodId = values.campusInfo.neighborhoodId;
    // }

    const response = await submitCampus(payload);
    console.log("📥 Step 4 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Kampüs bilgileri kaydedildi", "success");
      nextStep();
    } else {
      console.error("❌ Step 4 başarısız:", response);
      showSnackbar("Kampüs bilgileri kaydedilemedi", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, values, submitCampus, showSnackbar, nextStep, setUserId]);

  const handleSubmitStep5 = useCallback(async () => {
    console.log("🚀 handleSubmitStep5 çağrıldı:", {
      userId,
      packageSelection: values?.packageSelection,
    });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.packageSelection?.selectedPlanId) {
      console.error("❌ Step 5 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasPackageSelection: !!values?.packageSelection?.selectedPlanId,
      });
      showSnackbar("Paket seçimi eksik", "error");
      return;
    }

    console.log("📤 Step 5 API isteği gönderiliyor:", {
      userId: effectiveUserId,
      subscriptionId: values.packageSelection.selectedPlanId,
    });

    // Backend: RegisterSubscriptionDto (userId, subscriptionId)
    const payload = {
      userId: effectiveUserId,
      subscriptionId: parseInt(values.packageSelection.selectedPlanId),
    };

    const response = await submitSubscription(payload);
    console.log("📥 Step 5 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Paket seçimi kaydedildi", "success");
      nextStep();
    } else {
      console.error("❌ Step 5 başarısız:", response);
      showSnackbar("Paket seçimi kaydedilemedi", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, values, submitSubscription, showSnackbar, nextStep, setUserId]);

  const handleSubmitStep6 = useCallback(async () => {
    console.log("🚀 handleSubmitStep6 çağrıldı:", {
      userId,
      packageSelection: values?.packageSelection,
    });

    // userId yoksa auth context'ten user'ın id'sini kullan
    const authUserId = user?.id;
    const effectiveUserId = userId || authUserId;

    if (!effectiveUserId || !values?.packageSelection?.selectedPlanId) {
      console.error("❌ Step 6 submit edilemedi:", {
        userId,
        authUserId,
        effectiveUserId,
        hasPackageSelection: !!values?.packageSelection?.selectedPlanId,
      });
      showSnackbar("Ödeme bilgileri eksik", "error");
      return;
    }

    console.log("📤 Step 6 API isteği gönderiliyor:", {
      userId: effectiveUserId,
      subscriptionId: values.packageSelection.selectedPlanId,
    });

    // Backend: RegisterPaymentDto (userId, subscriptionId)
    const payload = {
      userId: effectiveUserId,
      subscriptionId: parseInt(values.packageSelection.selectedPlanId),
    };

    const response = await submitPayment(payload);
    console.log("📥 Step 6 API response:", response);

    if (response?.success) {
      // userId'yi set et (eğer yoksa)
      if (!userId && effectiveUserId) {
        setUserId(effectiveUserId);
      }
      showSnackbar("Ödeme bilgileri kaydedildi", "success");
      nextStep(); // Step 7'ye geç
    } else {
      console.error("❌ Step 6 başarısız:", response);
      showSnackbar("Ödeme bilgileri kaydedilemedi", "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, values, submitPayment, showSnackbar, nextStep, setUserId]);

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
    isLoading:
      step1Loading ||
      step2Loading ||
      step3Loading ||
      step4Loading ||
      step5Loading ||
      step6Loading ||
      step7Loading,
    isVerifying,
    isSubmitting:
      step1Loading ||
      step2Loading ||
      step3Loading ||
      step4Loading ||
      step5Loading ||
      step6Loading ||
      step7Loading,

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
