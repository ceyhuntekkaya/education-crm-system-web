export interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
}

export interface FilterGroup {
  title: string;
  icon: string;
  filters: Array<{
    key: string;
    label: string;
    value: string;
  }>;
}

export interface FilterGroupComponentProps {
  group: FilterGroup;
  onRemoveFilter: (filterKey: string) => void;
}

// Not needed anymore - components use hooks directly
// export interface SearchResultsInfoProps {
//   resultCount: number;
// }

// export interface GroupedFiltersContainerProps {
//   filterGroups: FilterGroup[];
//   onRemoveFilter: (filterKey: string) => void;
// }
