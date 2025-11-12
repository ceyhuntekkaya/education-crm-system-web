"use client";

import React, { createContext, useContext, Suspense } from "react";
import { useFormHook } from "@/hooks";
import { Loading } from "@/components";

// 🎯 CLEAN ESSENTIAL HOOKS
import {
  useLocationData,
  useLocationDependencies,
  useInstitutionTypes,
  useSectionChanges,
  useSearch,
  useUrlToFormSync,
  useUrlAutoSearch,
  useFavoriteSearchLoad,
} from "../hooks";

import { SearchContextValue, SearchProviderProps } from "../types";

/**
 * 🔍 SEARCH CONTEXT
 * Sadece hook koordinasyonu yapar - tüm logic hook'larda
 */

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

const SearchProviderContent = ({ children }: SearchProviderProps) => {
  // 📝 FORM MANAGEMENT
  const {
    values,
    updateField,
    isDirty,
    areFieldsDirty,
    initialValues,
    resetForm,
  } = useFormHook();

  // 🗺️ LOCATION DATA
  const locationData = useLocationData(values);
  useLocationDependencies(values, updateField);

  // 🏫 INSTITUTION TYPES
  const { institutionTypes, institutionTypesOptions } = useInstitutionTypes();

  // 🔍 SEARCH WITH RESULTS
  const {
    search,
    searchLoading,
    searchError,
    institutions,
    totalElements,
    hasSearched,
    resetSearchResults,
  } = useSearch();

  // ⭐ FAVORITE SEARCH LOADING (öncelikli - diğer URL işlemlerinden önce)
  useFavoriteSearchLoad({
    search,
    institutionTypes,
  });

  // 🎨 SECTION CHANGES
  const sectionChanges = useSectionChanges(
    isDirty,
    areFieldsDirty,
    values,
    initialValues,
    institutionTypes
  );

  // 🔗 URL SYNC
  const { hasUrlParams, urlPropertyFilters } = useUrlToFormSync();

  // 🔗 URL AUTO-SEARCH
  const { hasTriggeredUrlSearch } = useUrlAutoSearch({
    hasUrlParams,
    values,
    institutionTypes,
    urlPropertyFilters,
    search,
  });

  // 🎛️ OPTIONS FOR COMPONENTS
  const options = {
    institution: institutionTypesOptions,
    location: locationData,
  };

  // 🔄 RESET FUNCTION
  const resetSearch = () => {
    resetSearchResults();
    if (hasTriggeredUrlSearch?.current !== undefined) {
      hasTriggeredUrlSearch.current = false;
    }
  };

  // 🎯 CONTEXT VALUE
  const contextValue: SearchContextValue = {
    // Search Results
    institutions,
    totalElements,
    hasSearched,

    // Form State
    formValues: values,

    // Institution Data
    institutionTypes,

    // Location Data
    countries: locationData.countries,
    provinces: locationData.provinces,
    districts: locationData.districts,
    neighborhoods: locationData.neighborhoods,

    // Options
    options,

    // UI State
    sectionChanges,

    // Actions
    search,
    searchLoading,
    searchError,
    resetSearch,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export function SearchProvider({ children }: SearchProviderProps) {
  return (
    <Suspense fallback={<Loading />}>
      <SearchProviderContent>{children}</SearchProviderContent>
    </Suspense>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}

export default SearchContext;
