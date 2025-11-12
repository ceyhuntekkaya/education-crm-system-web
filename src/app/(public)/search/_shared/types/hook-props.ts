import { SchoolSearchDto } from "@/types";

/**
 * 🔍 FAVORITE SEARCH LOAD HOOK PROPS
 */
export interface UseFavoriteSearchLoadProps {
  search?: (data: SchoolSearchDto) => Promise<any>;
  institutionTypes?: any[];
}

/**
 * 🔗 URL AUTO SEARCH HOOK PROPS
 */
export interface UseUrlAutoSearchProps {
  hasUrlParams: boolean;
  values: any;
  institutionTypes: any[];
  urlPropertyFilters: number[];
  search: (params: any) => Promise<any>;
}

/**
 * 🔍 SEARCH HOOK PROPS
 */
export interface UseSearchParams {
  onSearchSuccess?: (data: any) => void;
}

/**
 * 💾 SAVE FAVORITE SEARCH HOOK PROPS
 */
export interface UseSaveFavoriteSearchParams {
  onSuccess?: () => void;
}
