"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import * as yup from "yup";

// Form değer tipi
export interface FormValues {
  [key: string]: string | number | boolean | null | undefined;
}

// Form hata tipi
export interface FormErrors {
  [key: string]: string | undefined;
}

// Form context tipi
interface FormContextType {
  values: FormValues;
  errors: FormErrors;
  initialValues: FormValues;
  setValue: (
    name: string,
    value: string | number | boolean | null | undefined
  ) => Promise<void>;
  setError: (name: string, error: string | undefined) => void;
  getValue: (name: string) => string | number | boolean | null | undefined;
  getError: (name: string) => string | undefined;
  isFieldRequired: (name: string) => boolean;
  reset: () => void;
  validate: () => Promise<boolean>;
  isValid: boolean;
}

// Form context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Form provider props
interface FormProviderProps {
  children: ReactNode;
  initialValues?: FormValues;
  validationRules?: {
    [key: string]: (
      value: string | number | boolean | null | undefined
    ) => string | undefined;
  };
  validationSchema?: yup.ObjectSchema<FormValues>;
  onSubmit?: (values: FormValues) => void | Promise<void>;
}

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
      value: string | number | boolean | null | undefined
    ) => {
      if (!validationSchema) return undefined;

      try {
        await validationSchema.validateAt(fieldName, { [fieldName]: value });
        return undefined;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return error.message;
        }
        return "Validation error";
      }
    },
    [validationSchema]
  );

  // Değer güncelleme
  const setValue = useCallback(
    async (
      name: string,
      value: string | number | boolean | null | undefined
    ) => {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Hata varsa temizle
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }

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
    [errors, validationRules, validationSchema, validateFieldWithSchema]
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
      return values[name];
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
        // Boş bir nesne ile test et - eğer required error alırsa field zorunludur
        validationSchema.validateSyncAt(name, {});
        return false;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return (
            error.message.includes("required") ||
            error.message.includes("zorunlu")
          );
        }
        return false;
      }
    },
    [validationSchema]
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
    onChange: async (value: string | number | boolean | null | undefined) =>
      await setValue(name, value),
  };
};
