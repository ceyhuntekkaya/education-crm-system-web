// Types for institution search
export interface LocationFilter {
  countryId?: string;
  provinceId?: string;
  districtId?: string;
  neighborhoodId?: string;
}

export interface SearchFormValues {
  countryId?: string;
  provinceId?: string;
  districtId?: string;
  neighborhoodId?: string;
  [key: string]: unknown;
}

export interface UseInstitutionSearchHookParams {
  values?: SearchFormValues;
  updateField?: (
    name: string,
    value: string | number | boolean | null | undefined
  ) => Promise<void>;
}
