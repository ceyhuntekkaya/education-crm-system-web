import { useEffect, useRef } from "react";
import { UseUrlAutoSearchProps } from "../types";
import { createApiParams, cleanApiParams } from "../utils";

/**
 * 🔗 URL AUTO SEARCH HOOK
 * URL'den gelen parametrelerle otomatik arama yapar
 * Sadece sayfa ilk yüklendiğinde çalışır
 */
export function useUrlAutoSearch({
  hasUrlParams,
  values,
  institutionTypes,
  urlPropertyFilters,
  search,
}: UseUrlAutoSearchProps) {
  const hasTriggeredUrlSearch = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const favSearchId = searchParams.get("favSearchId");

    // Skip if favorite search will handle it
    if (
      hasUrlParams &&
      !hasTriggeredUrlSearch.current &&
      values &&
      institutionTypes.length > 0 &&
      !favSearchId
    ) {
      hasTriggeredUrlSearch.current = true;

      const apiParams = createApiParams(values, institutionTypes);
      if (urlPropertyFilters.length > 0) {
        apiParams.propertyFilters = urlPropertyFilters;
      }

      const cleanParams = cleanApiParams(apiParams);
      search(cleanParams);
    }
  }, [hasUrlParams, values, institutionTypes, urlPropertyFilters, search]);

  return {
    hasTriggeredUrlSearch,
  };
}
