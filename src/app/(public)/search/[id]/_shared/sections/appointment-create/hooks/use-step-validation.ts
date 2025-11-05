import { useMemo } from "react";
import { useFormHook } from "@/hooks/use-form-hook";
import { AppointmentCreateFormData } from "../types";

/**
 * Step validation hook
 * Her step için validation kontrolü yapar
 * Register form mimarisini takip eder
 *
 * ⚠️ ÖNEMLİ DEĞİŞİKLİK: useCallback yerine useMemo kullanıyoruz
 * Sebep: useCallback fonksiyon referansı döndürür, referans değişmediğinde React re-render tetiklemiyor
 * Çözüm: useMemo ile computed boolean values döndürüyoruz, değer değiştiğinde otomatik re-render
 */
export const useStepValidation = () => {
  const { values } = useFormHook();
  const formData = values as AppointmentCreateFormData;

  /**
   * Step 1: Randevu Türü - validation
   * Computed value olarak döndürülüyor (boolean)
   */
  const isStep1Valid = useMemo((): boolean => {
    return !!formData.appointmentType;
  }, [formData.appointmentType]);

  /**
   * Step 2: Tarih ve Saat - validation
   * Computed value olarak döndürülüyor (boolean)
   */
  const isStep2Valid = useMemo((): boolean => {
    return !!(formData.appointmentDate && formData.selectedSlotId);
  }, [formData.appointmentDate, formData.selectedSlotId]);

  /**
   * Step 3: Öğrenci Bilgileri - validation
   * Computed value olarak döndürülüyor (boolean)
   */
  const isStep3Valid = useMemo((): boolean => {
    return !!(
      formData.studentName &&
      formData.studentAge &&
      formData.gradeInterested
    );
  }, [formData.studentName, formData.studentAge, formData.gradeInterested]);

  /**
   * Step 4: Onay - validation
   * Computed value olarak döndürülüyor (boolean)
   */
  const isStep4Valid = useMemo((): boolean => {
    return !!formData.agreedToTerms;
  }, [formData.agreedToTerms]);

  /**
   * Belirli bir step'in tamamlanıp tamamlanmadığını kontrol eder
   * Computed value olarak döndürülüyor (function)
   */
  const isStepCompleted = useMemo(
    () =>
      (step: number): boolean => {
        switch (step) {
          case 1:
            return isStep1Valid;
          case 2:
            return isStep2Valid;
          case 3:
            return isStep3Valid;
          case 4:
            return isStep4Valid;
          default:
            return false;
        }
      },
    [isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid]
  );

  /**
   * Bir sonraki step'e geçilebilir mi kontrolü
   * Computed value olarak döndürülüyor (boolean)
   */
  const canProceedToNextStep = useMemo(
    () =>
      (currentStep: number): boolean => {
        return isStepCompleted(currentStep);
      },
    [isStepCompleted]
  );

  return {
    isStepCompleted,
    canProceedToNextStep,
    isStep1Valid,
    isStep2Valid,
    isStep3Valid,
    isStep4Valid,
  };
};
