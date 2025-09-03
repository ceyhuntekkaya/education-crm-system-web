import type { SearchFormValues } from "./search-form-values";

// Hook parameters type
export interface UseInstitutionSearchHookParams {
  values?: SearchFormValues;
  updateField?: (
    name: string,
    value: string | number | boolean | null | undefined
  ) => Promise<void>;
}
