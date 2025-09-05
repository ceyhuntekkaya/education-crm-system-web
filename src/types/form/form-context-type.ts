import { FormValues } from "./form-values";
import { FormErrors } from "./form-errors";

// Form context tipi
export interface FormContextType {
  values: FormValues;
  errors: FormErrors;
  initialValues: FormValues;
  setValue: (
    name: string,
    value: string | number | boolean | null | undefined | any[] | any
  ) => Promise<void>;
  setError: (name: string, error: string | undefined) => void;
  getValue: (
    name: string
  ) => string | number | boolean | null | undefined | any[] | any;
  getError: (name: string) => string | undefined;
  isFieldRequired: (name: string) => boolean;
  reset: () => void;
  validate: () => Promise<boolean>;
  isValid: boolean;
}
