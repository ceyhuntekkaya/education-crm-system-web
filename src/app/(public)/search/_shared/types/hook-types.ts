import { InstitutionTypeListDto } from "@/types";

// Location hooks için tipler
export interface LocationDataType {
  data: { value: string; label: string }[];
  loading: boolean;
  error: any;
}

export interface LocationDataReturn {
  countries: LocationDataType;
  provinces: LocationDataType;
  districts: LocationDataType;
  neighborhoods: LocationDataType;
}

// Institution hooks için tipler
export interface InstitutionTypesReturn {
  institutionTypes: InstitutionTypeListDto[];
  institutionTypesOptions: {
    data: { value: string; label: string }[];
    loading: boolean;
    error: any;
  };
}

// Section changes için tipler
export type SectionChangesReturn = Record<string, boolean>;
