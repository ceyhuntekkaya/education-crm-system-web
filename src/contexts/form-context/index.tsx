"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import * as yup from "yup";
import {
  FormValues,
  FormErrors,
  FormContextType,
  FormProviderProps,
} from "@/types/form";

// Form context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Helper function to get nested value
const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

// Helper function to set nested value
const setNestedValue = (obj: any, path: string, value: any): any => {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
  return { ...obj };
};

// Form Provider bileşeni
export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialValues = {},
  validationRules = {},
  validationSchema,
}) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  // Yup schema ile field validation
  const validateFieldWithSchema = useCallback(
    async (
      fieldName: string,
      value: string | number | boolean | null | undefined | any[] | any
    ) => {
      if (!validationSchema) return undefined;

      try {
        // Nested path için tüm form values'ı kullan
        const testValues = setNestedValue({ ...values }, fieldName, value);
        await validationSchema.validateAt(fieldName, testValues);
        return undefined;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return error.message;
        }
        return "Validation error";
      }
    },
    [validationSchema, values]
  );

  // Değer güncelleme
  const setValue = useCallback(
    async (
      name: string,
      value: string | number | boolean | null | undefined | any[] | any
    ) => {
      setValues((prev) => setNestedValue({ ...prev }, name, value));

      // Hata varsa temizle
      setErrors((prev) => {
        if (prev[name]) {
          return {
            ...prev,
            [name]: undefined,
          };
        }
        return prev;
      });

      // Önce Yup schema ile kontrol et
      if (validationSchema) {
        const schemaError = await validateFieldWithSchema(name, value);
        if (schemaError) {
          setErrors((prev) => ({
            ...prev,
            [name]: schemaError,
          }));
          return;
        }
      }

      // Eğer validation rule varsa kontrol et (Yup yoksa)
      if (!validationSchema && validationRules[name]) {
        const error = validationRules[name](value);
        if (error) {
          setErrors((prev) => ({
            ...prev,
            [name]: error,
          }));
        }
      }
    },
    [validationRules, validationSchema, validateFieldWithSchema]
  );

  // Hata güncelleme
  const setError = useCallback((name: string, error: string | undefined) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  // Değer alma
  const getValue = useCallback(
    (name: string) => {
      return getNestedValue(values, name);
    },
    [values]
  );

  // Hata alma
  const getError = useCallback(
    (name: string) => {
      return errors[name];
    },
    [errors]
  );

  // Field zorunluluk kontrolü
  const isFieldRequired = useCallback(
    (name: string) => {
      if (!validationSchema) return false;

      try {
        // Nested yapı için boş değerlerle dolu bir test object oluştur
        const emptyValues = JSON.parse(JSON.stringify(initialValues));
        const emptyValue = setNestedValue(emptyValues, name, undefined);
        validationSchema.validateSyncAt(name, emptyValue);
        return false;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return (
            error.message.includes("required") ||
            error.message.includes("zorunlu") ||
            error.message.includes("gerekli")
          );
        }
        return false;
      }
    },
    [validationSchema, initialValues]
  );

  // Form sıfırlama
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  // Validation
  const validate = useCallback(async () => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Yup schema validation
    if (validationSchema) {
      try {
        await validationSchema.validate(values, { abortEarly: false });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          error.inner.forEach((err) => {
            if (err.path) {
              newErrors[err.path] = err.message;
              isValid = false;
            }
          });
        }
      }
    } else {
      // Manual validation rules (fallback)
      Object.keys(validationRules).forEach((fieldName) => {
        const rule = validationRules[fieldName];
        const value = values[fieldName];
        const error = rule(value);

        if (error) {
          newErrors[fieldName] = error;
          isValid = false;
        }
      });
    }

    setErrors(newErrors);
    return isValid;
  }, [values, validationRules, validationSchema]);

  // Form geçerliliği
  const isValid = Object.values(errors).every((error) => !error);

  const contextValue: FormContextType = {
    values,
    errors,
    initialValues,
    setValue,
    setError,
    getValue,
    getError,
    isFieldRequired,
    reset,
    validate,
    isValid,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

// Form hook'u
export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

// Form field hook'u - spesifik bir field için
export const useFormField = (name: string) => {
  const { getValue, getError, setValue, isFieldRequired } = useForm();

  return {
    value: getValue(name),
    error: getError(name),
    required: isFieldRequired(name),
    onChange: async (
      value: string | number | boolean | null | undefined | any[] | any
    ) => await setValue(name, value),
  };
};
