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
  data: { value: string; label: string }[];
  loading: boolean;
  error: any;
}

export interface InstitutionChangesReturn {
  institutionTypeChangeCounter: number;
}

// Section changes için tipler
export type SectionChangesReturn = Record<string, boolean>;

// Search hooks için tipler
export interface SearchReturn {
  search: (data: any) => Promise<any>;
  searchLoading: boolean;
  searchError: any;
}
