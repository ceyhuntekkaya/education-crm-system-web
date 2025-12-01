"use client";

import { useCallback, useMemo, useEffect, useRef } from "react";
import { useForm } from "@/contexts";
import { FormValues } from "@/types";

// useFormHook - Form işlemleri için özel hook
export const useFormHook = () => {
  const {
    values,
    errors,
    setValue,
    setError,
    getValue,
    getError,
    isFieldRequired,
    reset,
    validate,
    isValid,
    initialValues,
  } = useForm();

  // Form reset işlemi
  const resetForm = useCallback(() => {
    reset();
  }, [reset]);

  // Form validation işlemi
  const validateForm = useCallback(async () => {
    return await validate();
  }, [validate]);

  // Spesifik field'ın değerini güncelleme
  const updateField = useCallback(
    async (
      name: string,
      value: string | number | boolean | null | undefined
    ) => {
      await setValue(name, value);
    },
    [setValue]
  );

  // Spesifik field'a hata ekleme
  const setFieldError = useCallback(
    (name: string, error: string | undefined) => {
      setError(name, error);
    },
    [setError]
  );

  // Spesifik field'ın değerini alma
  const getFieldValue = useCallback(
    (name: string) => {
      return getValue(name);
    },
    [getValue]
  );

  // Spesifik field'ın hatasını alma
  const getFieldError = useCallback(
    (name: string) => {
      return getError(name);
    },
    [getError]
  );

  // Field'ın zorunlu olup olmadığını kontrol etme
  const isRequired = useCallback(
    (name: string) => {
      return isFieldRequired(name);
    },
    [isFieldRequired]
  );

  // Form verilerini JSON string olarak alma
  const getFormDataAsJson = useCallback(() => {
    return JSON.stringify(values, null, 2);
  }, [values]);

  // Form verilerini FormData objesi olarak alma (file upload için)
  const getFormDataAsFormData = useCallback(() => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    });
    return formData;
  }, [values]);

  // Belirli field'ları güncelleme (bulk update)
  const updateFields = useCallback(
    async (fieldsToUpdate: FormValues) => {
      const updatePromises = Object.keys(fieldsToUpdate).map(
        async (fieldName) => {
          await setValue(fieldName, fieldsToUpdate[fieldName]);
        }
      );
      await Promise.all(updatePromises);
    },
    [setValue]
  );

  // Form değerlerini başka bir obje ile birleştirme
  const mergeFormValues = useCallback(
    async (newValues: FormValues) => {
      await updateFields({ ...values, ...newValues });
    },
    [values, updateFields]
  );

  // Hata olan field'ları alma
  const getFieldsWithErrors = useCallback(() => {
    return Object.keys(errors).filter((fieldName) => errors[fieldName]);
  }, [errors]);

  // Form'da herhangi bir hata olup olmadığını kontrol etme
  const hasErrors = useMemo(() => {
    return Object.keys(errors).some((fieldName) => errors[fieldName]);
  }, [errors]);

  // Form dirty durumunu kontrol etme (değiştirilip değiştirilmediği)
  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  // Belirli field'ların dirty durumunu kontrol etme
  const areFieldsDirty = useCallback(
    (fieldNames: string[]) => {
      return fieldNames.some((fieldName) => {
        const currentValue = values[fieldName];
        const initialValue = initialValues[fieldName];

        // Array değerler için deep comparison
        if (Array.isArray(currentValue) && Array.isArray(initialValue)) {
          return JSON.stringify(currentValue) !== JSON.stringify(initialValue);
        }

        // Diğer değerler için basit karşılaştırma
        return currentValue !== initialValue;
      });
    },
    [values, initialValues]
  );

  // Field'ları temizleme (belirli field'ları boşaltma)
  const clearFields = useCallback(
    async (fieldNames: string[]) => {
      const clearPromises = fieldNames.map(async (fieldName) => {
        await setValue(fieldName, "");
      });
      await Promise.all(clearPromises);
    },
    [setValue]
  );

  // Belirli alanlar hariç tüm formu sıfırlama
  const clearAllFieldsExcept = useCallback(
    async (excludeFields: string[] = []) => {
      const fieldsToReset = Object.keys(values).filter(
        (fieldName) => !excludeFields.includes(fieldName)
      );
      await clearFields(fieldsToReset);
    },
    [values, clearFields]
  );

  // Bir field değiştiğinde başka field'ları sıfırla
  const useResetFieldOnChange = (
    watchField: string,
    fieldsToReset: string | string[]
  ) => {
    const watchValue = values[watchField];
    const prevValueRef = useRef(watchValue);

    useEffect(() => {
      if (prevValueRef.current !== watchValue) {
        prevValueRef.current = watchValue;
        const fields = Array.isArray(fieldsToReset)
          ? fieldsToReset
          : [fieldsToReset];
        fields.forEach((field) => setValue(field, ""));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchValue]);
  };

  return {
    // Form state
    values,
    errors,
    isValid,
    setValue,
    initialValues,

    // Field operations
    updateField,
    getFieldValue,
    getFieldError,
    setFieldError,
    isRequired,

    // Bulk operations
    updateFields,
    mergeFormValues,
    clearFields,
    clearAllFieldsExcept,

    // Form operations
    resetForm,
    validateForm,

    // Utility functions
    getFormDataAsJson,
    getFormDataAsFormData,
    getFieldsWithErrors,
    hasErrors,
    isDirty,
    areFieldsDirty,

    // Field dependency
    useResetFieldOnChange,
  };
};
