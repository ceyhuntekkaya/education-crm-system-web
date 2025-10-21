/**
 * Active filters utility types
 */

export interface ActiveFiltersConfig {
  filters: Record<string, any> | null | undefined;
  onRemoveFilter?: (key: string) => void;
}

export interface FilterSubtitleConfig {
  filters: Record<string, any> | null | undefined;
  totalCount: number;
  loadingText?: string;
}
