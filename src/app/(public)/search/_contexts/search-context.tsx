"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
} from "react";
import { useGet, usePostForm, useFormHook } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import {
  ApiResponseDto,
  CountryDto,
  DistrictDto,
  InstitutionTypeDto,
  NeighborhoodDto,
  ProvinceDto,
  SchoolSearchDto,
  SchoolSearchResultDto,
} from "@/types";

import { SECTION_FIELD_MAPPING } from "../_sections/filter-form/_constants";
import { mockInstitutions } from "../_mock";
import {
  calculateDynamicSectionChanges,
  getDynamicPropertyGroups,
} from "../_utils";
import { SearchContextValue, SearchProviderProps } from "../_types";

// Context'in varsayılan değeri
const SearchContext = createContext<SearchContextValue | undefined>(undefined);

/**
 * API'den gelen lokasyon verilerini select component'i için uygun formata dönüştürür
 * @param data - API'den gelen lokasyon verileri (ülke, il, ilçe vb.)
 * @param placeholder - Select'te gösterilecek placeholder metni
 * @returns Select component'i için formatlanmış veri dizisi
 */
const transformLocationData = <T extends { id?: number; name?: string }>(
  data: T[] | undefined,
  placeholder: string
) => [
  // İlk sırada placeholder'ı boş value ile ekle
  { value: "", label: placeholder },
  // API verilerini select formatına dönüştür
  ...(data?.map((item) => ({
    value: item.id?.toString() || "",
    label: item.name || "",
  })) || []),
];

export function SearchProvider({ children }: SearchProviderProps) {
  // Form hook'tan sadece gerekli değerleri al
  const { values, updateField, isDirty, areFieldsDirty, initialValues } =
    useFormHook();
  // Önceki değerleri takip etmek için ref kullanıyoruz
  const prevValues = useRef({
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
  });
  // ============ API ÇAĞRILARI ============

  // Tüm ülkeleri getir - her zaman yüklenir
  const {
    data: countriesResponse,
    loading: countriesLoading,
    error: countriesError,
  } = useGet<ApiResponseDto<CountryDto[]>>(API_ENDPOINTS.LOCATION.COUNTRIES);

  // İlleri getir - ülke seçilmişse
  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    values?.countryId
      ? API_ENDPOINTS.LOCATION.PROVINCES(values.countryId)
      : null // Ülke seçilmemişse API çağrısı yapma
  );

  // İlçeleri getir - il seçilmişse
  const {
    data: districtsResponse,
    loading: districtsLoading,
    error: districtsError,
  } = useGet<ApiResponseDto<DistrictDto[]>>(
    values?.provinceId
      ? API_ENDPOINTS.LOCATION.DISTRICTS(values.provinceId)
      : null // İl seçilmemişse API çağrısı yapma
  );

  // Mahalleleri getir - ilçe seçilmişse
  const {
    data: neighborhoodsResponse,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useGet<ApiResponseDto<NeighborhoodDto[]>>(
    values?.districtId
      ? API_ENDPOINTS.LOCATION.NEIGHBORHOODS(values.districtId)
      : null // İlçe seçilmemişse API çağrısı yapma
  );

  // Kurum türlerini getir - her zaman yüklenir
  const {
    data: institutionTypesResponse,
    loading: institutionTypesLoading,
    error: institutionTypesError,
  } = useGet<ApiResponseDto<InstitutionTypeDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.INSTITUTION_TYPES
  );

  // ============ VERİ DÖNÜŞÜMLERI ============
  // API'den gelen verileri select component'leri için uygun formata dönüştür

  // Ülkeler - her zaman mevcut
  const countries = {
    data: transformLocationData(countriesResponse?.data, "Ülke seçin"),
    loading: countriesLoading,
    error: countriesError,
  };

  // İller - ülke seçilmişse mevcut
  const provinces = {
    data: transformLocationData(provincesResponse?.data, "İl seçin"),
    loading: provincesLoading,
    error: provincesError,
  };

  // İlçeler - il seçilmişse mevcut
  const districts = {
    data: transformLocationData(districtsResponse?.data, "İlçe seçin"),
    loading: districtsLoading,
    error: districtsError,
  };

  // Mahalleler - ilçe seçilmişse mevcut
  const neighborhoods = {
    data: transformLocationData(neighborhoodsResponse?.data, "Mahalle seçin"),
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  };

  // Kurum türleri - her zaman mevcut (placeholder olmadan)
  const institutionTypes = {
    data: [
      ...(institutionTypesResponse?.data?.map((type) => ({
        value: type.id?.toString() || "",
        label: type.displayName || "",
      })) || []),
    ],
    loading: institutionTypesLoading,
    error: institutionTypesError,
  };

  // ============ SECTION DEĞİŞİKLİK DURUMU ============
  // Her section için değişiklik durumunu hesapla
  const sectionChanges = useMemo(() => {
    const changes: Record<string, boolean> = {};

    // Eğer form hiç değişmemişse hiçbir section'da değişiklik yok
    if (!isDirty) {
      Object.keys(SECTION_FIELD_MAPPING).forEach((sectionId) => {
        changes[sectionId] = false;
      });

      // Dinamik section'lar için de false olarak ayarla
      const selectedInstitutionType = values?.institutionTypeId || "";
      if (selectedInstitutionType) {
        const dynamicGroups = getDynamicPropertyGroups(selectedInstitutionType);

        dynamicGroups.forEach((group: any) => {
          changes[`property-group-${group.id}`] = false;
        });
      }

      return changes;
    }

    // Her section için field'ları kontrol et
    Object.keys(SECTION_FIELD_MAPPING).forEach((sectionId) => {
      const fields =
        SECTION_FIELD_MAPPING[sectionId as keyof typeof SECTION_FIELD_MAPPING];
      changes[sectionId] = areFieldsDirty([...fields]); // readonly array'i mutable array'e dönüştür
    });

    // Dinamik property section'ları için değişiklik kontrolü
    const selectedInstitutionType = values?.institutionTypeId || "";
    if (selectedInstitutionType) {
      const dynamicChanges = calculateDynamicSectionChanges(
        selectedInstitutionType,
        values,
        initialValues
      );

      // Dinamik değişiklikleri ana changes objesine ekle
      Object.assign(changes, dynamicChanges);
    }

    return changes;
  }, [isDirty, areFieldsDirty, values, initialValues]);

  // ============ BAĞIMLI ALAN TEMİZLEME LOGİĞİ ============
  // Üst seviye bir alan değiştiğinde, alt seviye alanları otomatik olarak temizle
  // Örn: Ülke değişirse → il, ilçe, mahalle temizlenir
  //      İl değişirse → ilçe, mahalle temizlenir
  //      İlçe değişirse → mahalle temizlenir
  useEffect(() => {
    // Ülke değişti - bağımlı alanları temizle
    if (prevValues.current.countryId !== values?.countryId) {
      prevValues.current.countryId = values?.countryId;
      if (values?.provinceId) updateField("provinceId", "");
      if (values?.districtId) updateField("districtId", "");
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }

    // İl değişti - bağımlı alanları temizle
    if (prevValues.current.provinceId !== values?.provinceId) {
      prevValues.current.provinceId = values?.provinceId;
      if (values?.districtId) updateField("districtId", "");
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }

    // İlçe değişti - bağımlı alanları temizle
    if (prevValues.current.districtId !== values?.districtId) {
      prevValues.current.districtId = values?.districtId;
      if (values?.neighborhoodId) updateField("neighborhoodId", "");
    }
  }, [values, updateField]);

  // ============ ARAMA FONKSİYONALİTESİ ============
  // Form verilerini kullanarak kurum araması yapar
  const {
    submitForm: search,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, ApiResponseDto<SchoolSearchResultDto[]>>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (data) => {
        console.log("Arama başarılı:", data);
      },
      onError: (err) => {
        console.error("Arama hatası:", err);
      },
    }
  );

  // ============ SELECT COMPONENTLERİ İÇİN OPTION GRUPLARİ ============
  const options = {
    institution: institutionTypes, // Kurum türü seçenekleri
    location: {
      countries, // Ülke seçenekleri
      provinces, // İl seçenekleri
      districts, // İlçe seçenekleri
      neighborhoods, // Mahalle seçenekleri
    },
  };

  // Context değerini oluştur
  const contextValue: SearchContextValue = {
    // Mock veriler (geliştirme aşamasında kullanılıyor)
    institutions: mockInstitutions,

    // Lokasyon verileri (ayrı ayrı erişim için)
    countries,
    provinces,
    districts,
    neighborhoods,

    // Gruplandırılmış seçenekler (component'lerde kolayca kullanım için)
    options,

    // Section değişiklik durumları
    sectionChanges,

    // Arama fonksiyonalitesi
    search, // Arama fonksiyonu
    searchLoading, // Arama yükleniyor durumu
    searchError, // Arama hata durumu
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
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
