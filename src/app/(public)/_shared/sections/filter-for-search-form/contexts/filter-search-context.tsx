"use client";

import React, { createContext, useContext } from "react";
import { useFormHook } from "@/hooks";
import {
  useLocationData,
  useLocationDependencies,
  useFilterSubmit,
  useInstitutionTypes,
} from "../hooks";

interface FilterSearchContextValue {
  // Lokasyon verileri
  options: {
    location: {
      provinces: {
        data: { value: string; label: string }[];
        loading: boolean;
        error: any;
      };
      districts: {
        data: { value: string; label: string }[];
        loading: boolean;
        error: any;
      };
    };
    institutionTypes: {
      data: {
        value: string;
        label: string;
        groupId?: number;
        groupName?: string;
      }[];
      loading: boolean;
      error: any;
    };
    institutionGroups: {
      data: { value: string; label: string }[];
      loading: boolean;
      error: any;
    };
  };
  // Submit handler
  handleSubmit: (values: any) => void;
  // Ham kurum türleri verisi
  rawInstitutionTypes: any[];
}

interface FilterSearchProviderProps {
  children: React.ReactNode;
}

// Context'in varsayılan değeri
const FilterSearchContext = createContext<FilterSearchContextValue | undefined>(
  undefined
);

export function FilterSearchProvider({ children }: FilterSearchProviderProps) {
  // Form hook'tan değerleri al
  const { values, updateField } = useFormHook();

  // Lokasyon verilerini getir
  const locationData = useLocationData(values);

  // Kurum türlerini getir
  const institutionTypesData = useInstitutionTypes();

  // Lokasyon bağımlılıklarını yönet
  useLocationDependencies(values, updateField);

  // Submit hook'unu kullan
  const { handleSubmit } = useFilterSubmit();

  // Context değerini oluştur
  const contextValue: FilterSearchContextValue = {
    options: {
      location: locationData,
      institutionTypes: institutionTypesData.institutionTypes,
      institutionGroups: institutionTypesData.institutionGroups,
    },
    handleSubmit,
    // Ham veri de sağlıyoruz (ihtiyaç halinde)
    rawInstitutionTypes: institutionTypesData.rawInstitutionTypes,
  };

  return (
    <FilterSearchContext.Provider value={contextValue}>
      {children}
    </FilterSearchContext.Provider>
  );
}

// Context'i kullanmak için hook
export function useFilterSearchContext() {
  const context = useContext(FilterSearchContext);
  if (context === undefined) {
    throw new Error(
      "useFilterSearchContext must be used within a FilterSearchProvider"
    );
  }
  return context;
}
