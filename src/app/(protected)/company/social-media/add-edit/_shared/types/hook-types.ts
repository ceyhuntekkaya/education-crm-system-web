export interface SelectOption {
  value: string;
  label: string;
}

export interface UsePostOptionsReturn {
  postTypeOptions: SelectOption[];
  postStatusOptions: SelectOption[];
}
