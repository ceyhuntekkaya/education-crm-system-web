"use client";

import { useEffect, useRef, useMemo } from "react";
import { useGet, usePostForm } from "@/hooks";
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

import type { LocationFilter, UseInstitutionSearchHookParams } from "../_types";
import { SECTION_FIELD_MAPPING } from "../_sections/filter-form/_constants";
import { mockInstitutions } from "../_mock";

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

/**
 * Kurum arama sayfası için gerekli tüm verileri ve fonksiyonları sağlayan custom hook
 * - Lokasyon verilerini (ülke, il, ilçe, mahalle) yönetir
 * - Kurum türlerini getirir
 * - Arama fonksiyonalitesi sağlar
 * - Form alanları arası bağımlılıkları otomatik olarak yönetir
 *
 * @param values - Form değerleri (countryId, provinceId, districtId, neighborhoodId)
 * @param updateField - Form alanlarını güncellemek için kullanılan fonksiyon
 */
export function useInstitutionSearchHook({
  values = {},
  updateField = async () => {},
  isDirty = false,
  areFieldsDirty = () => false,
}: UseInstitutionSearchHookParams = {}) {
  // Önceki değerleri takip etmek için ref kullanıyoruz
  // Bu sayede hangi alanın değiştiğini tespit edip bağımlı alanları temizleyebiliriz
  const prevValues = useRef({
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
  });

  // API çağrıları için gerekli lokasyon filtre objesi
  const locationFilter: LocationFilter = {
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
    neighborhoodId: values?.neighborhoodId,
  };

  // ============ API ÇAĞRILARI ============

  // Tüm ülkeleri getir - her zaman yüklenir
  const {
    data: countriesResponse,
    loading: countriesLoading,
    error: countriesError,
  } = useGet<ApiResponseDto<CountryDto[]>>(API_ENDPOINTS.LOCATION.COUNTRIES);

  // İlleri getir - sadece ülke seçilmişse
  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    locationFilter.countryId
      ? API_ENDPOINTS.LOCATION.PROVINCES(locationFilter.countryId)
      : null // Ülke seçilmemişse API çağrısı yapma
  );

  // İlçeleri getir - sadece il seçilmişse
  const {
    data: districtsResponse,
    loading: districtsLoading,
    error: districtsError,
  } = useGet<ApiResponseDto<DistrictDto[]>>(
    locationFilter.provinceId
      ? API_ENDPOINTS.LOCATION.DISTRICTS(locationFilter.provinceId)
      : null // İl seçilmemişse API çağrısı yapma
  );

  // Mahalleleri getir - sadece ilçe seçilmişse
  const {
    data: neighborhoodsResponse,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useGet<ApiResponseDto<NeighborhoodDto[]>>(
    locationFilter.districtId
      ? API_ENDPOINTS.LOCATION.NEIGHBORHOODS(locationFilter.districtId)
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
      return changes;
    }

    // Her section için field'ları kontrol et
    Object.keys(SECTION_FIELD_MAPPING).forEach((sectionId) => {
      const fields =
        SECTION_FIELD_MAPPING[sectionId as keyof typeof SECTION_FIELD_MAPPING];
      changes[sectionId] = areFieldsDirty([...fields]); // readonly array'i mutable array'e dönüştür
    });

    return changes;
  }, [isDirty, areFieldsDirty]);

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

  // ============ HOOK RETURN DEĞERLERİ ============
  return {
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
}

export default useInstitutionSearchHook;
