import { ReactNode } from "react";
import { FormValues } from "./form-values";
import * as yup from "yup";

// Form provider props
export interface FormProviderProps {
  children: ReactNode;
  initialValues?: FormValues;
  validationRules?: {
    [key: string]: (
      value: string | number | boolean | null | undefined | any[] | any
    ) => string | undefined;
  };
  validationSchema?: yup.ObjectSchema<FormValues>;
  onSubmit?: (values: FormValues) => void | Promise<void>;
}
