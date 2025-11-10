"use client";

import React, { createContext, useContext, Suspense, useState } from "react";
import { useFormHook } from "@/hooks";
import { Loading } from "@/components";
import { SchoolSearchResultDto } from "@/types";

// Yeni modüler hooks'ları import et
import {
  useLocationData,
  useLocationDependencies,
  useInstitutionTypes,
  useInstitutionChanges,
  useSectionChanges,
  useSearch,
  useUrlToFormSync,
  useFavFilterSync,
} from "../hooks";

import { SearchContextValue, SearchProviderProps } from "../types";

// Context'in varsayılan değeri
const SearchContext = createContext<SearchContextValue | undefined>(undefined);

// Suspense boundary gerektiren hooks için ayrı component
const SearchProviderContent = ({ children }: SearchProviderProps) => {
  // Institutions state'i
  const [institutions, setInstitutions] = useState<SchoolSearchResultDto[]>([]);
  const [totalElements, setTotalElements] = useState<number>(0);
  // İlk arama yapıldı mı kontrolü
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  // Form hook'tan sadece gerekli değerleri al
  const {
    values,
    updateField,
    isDirty,
    areFieldsDirty,
    initialValues,
    clearAllFieldsExcept,
  } = useFormHook();

  // Modüler hooks'ları kullan
  const locationData = useLocationData(values);
  const { institutionTypes, institutionTypesOptions } = useInstitutionTypes();
  const sectionChanges = useSectionChanges(
    isDirty,
    areFieldsDirty,
    values,
    initialValues,
    institutionTypes
  );

  // useSearch hook'una setInstitutions callback'ini geçiyoruz
  const { search, searchLoading, searchError } = useSearch({
    onSearchSuccess: (data) => {
      if (data?.content) {
        setInstitutions(data.content);
        setTotalElements(data.totalElements || 0);
        // Başarılı arama sonrası hasSearched'i true yap
        setHasSearched(true);
      }
    },
  });

  const { institutionTypeChangeCounter } = useInstitutionChanges(
    values,
    clearAllFieldsExcept
  );

  // Lokasyon bağımlılıklarını yönet
  useLocationDependencies(values, updateField);

  // URL parametrelerini form değerleriyle senkronize et (useSearchParams kullanır)
  useUrlToFormSync();

  // Favori filtre senkronizasyonu (useSearchParams kullanır)
  useFavFilterSync();

  // SELECT COMPONENTLERİ İÇİN OPTION GRUPLARİ
  const options = {
    institution: institutionTypesOptions,
    location: locationData,
  };

  // Reset search - form'u temizle ve initial state'e dön
  const resetSearch = () => {
    setHasSearched(false);
    setInstitutions([]);
    setTotalElements(0);
  };

  // Context değerini oluştur
  const contextValue: SearchContextValue = {
    // API'den gelen veriler
    institutions,
    totalElements,
    hasSearched,

    // Kurum türleri ham verisi
    institutionTypes,

    // Lokasyon verileri (ayrı ayrı erişim için)
    countries: locationData.countries,
    provinces: locationData.provinces,
    districts: locationData.districts,
    neighborhoods: locationData.neighborhoods,

    // Gruplandırılmış seçenekler (component'lerde kolayca kullanım için)
    options,

    // Section değişiklik durumları
    sectionChanges,

    // Kurum türü değişiklik counter'ı
    institutionTypeChangeCounter,

    // Arama fonksiyonalitesi
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

// Context'i kullanmak için custom hook
export function useSearchContext() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}

export default SearchContext;
