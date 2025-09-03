"use client";

import { useEffect, useRef } from "react";
import { useGet, usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { SchoolSearchResultDto } from "@/types/institution/InstitutionSearch.types";
import { SchoolSearchDto } from "@/types/institution/SchoolSearchDto";
import { CountryDto } from "@/types/location/CountryDto";
import { ProvinceDto } from "@/types/location/ProvinceDto";
import { DistrictDto } from "@/types/location/DistrictDto";
import { NeighborhoodDto } from "@/types/location/NeighborhoodDto";
import { ApiResponseDto } from "@/types/user/ApiResponseDto";

const mockInstitutions: SchoolSearchResultDto[] = [
  {
    id: 1,
    name: "Başarı Koleji",
    slug: "basari-koleji",
    logoUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=center",
    coverImageUrl:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=200&fit=crop&crop=center",
    description: "Kaliteli eğitim ile geleceğe hazırlayan okul",
    institutionTypeName: "Özel Okul",
    institutionTypeIcon: "ph-graduation-cap",
    institutionTypeColor: "#3B82F6",
    minAge: 6,
    maxAge: 18,
    ageRange: "6-18 yaş",
    monthlyFee: 2500,
    formattedPrice: "₺2.500",
    ratingAverage: 4.8,
    ratingCount: 124,
    campusName: "Merkez Kampüs",
    address: "Atatürk Mahallesi, Eğitim Sokak No:15",
    district: "Kadıköy",
    city: "İstanbul",
    distanceKm: 2.5,
    highlights: ["İngilizce Eğitim", "Teknoloji Odaklı", "Spor Merkezi"],
    cardProperties: [
      {
        id: 1,
        propertyId: 1,
        propertyName: "classSize",
        propertyDisplayName: "Sınıf Mevcudu",
        dataType: "NUMBER",
        showInCard: true,
        showInProfile: true,
        numberValue: 20,
        displayValue: "20 öğrenci",
        formattedValue: "20",
      },
      {
        id: 2,
        propertyId: 2,
        propertyName: "hasTransport",
        propertyDisplayName: "Servis",
        dataType: "BOOLEAN",
        showInCard: true,
        showInProfile: true,
        booleanValue: true,
        displayValue: "Servis var",
        formattedValue: "Var",
      },
    ],
    activeCampaigns: [
      {
        id: 1,
        title: "Erken Kayıt İndirimi",
        description: "Şubat ayına kadar %15 indirim",
        campaignType: "DISCOUNT",
        discountType: "PERCENTAGE",
        discountAmount: 0,
        discountPercentage: 15,
        badgeText: "%15 İndirim",
        badgeColor: "#EF4444",
        thumbnailImageUrl: "",
        startDate: "2024-01-01",
        endDate: "2024-02-29",
        isActive: true,
      },
    ],
    hasActiveCampaigns: true,
    isSubscribed: false,
    isFavorite: false,
  },
  {
    id: 2,
    name: "Gelişim Anaokulu",
    slug: "gelisim-anaokulu",
    logoUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop&crop=center",
    coverImageUrl:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=200&fit=crop&crop=center",
    description: "3-6 yaş arası çocuklar için özel gelişim programları",
    institutionTypeName: "Anaokulu",
    institutionTypeIcon: "ph-baby",
    institutionTypeColor: "#10B981",
    minAge: 3,
    maxAge: 6,
    ageRange: "3-6 yaş",
    monthlyFee: 1800,
    formattedPrice: "₺1.800",
    ratingAverage: 4.5,
    ratingCount: 89,
    campusName: "Anaokulu Binası",
    address: "Çiçek Mahallesi, Oyun Sokak No:8",
    district: "Üsküdar",
    city: "İstanbul",
    distanceKm: 1.2,
    highlights: ["Montessori Yöntemi", "Organik Beslenme", "Oyun Alanı"],
    cardProperties: [
      {
        id: 3,
        propertyId: 3,
        propertyName: "maxCapacity",
        propertyDisplayName: "Sınıf Mevcudu",
        dataType: "NUMBER",
        showInCard: true,
        showInProfile: true,
        numberValue: 15,
        displayValue: "15 çocuk",
        formattedValue: "15",
      },
      {
        id: 4,
        propertyId: 4,
        propertyName: "hasGarden",
        propertyDisplayName: "Bahçe",
        dataType: "BOOLEAN",
        showInCard: true,
        showInProfile: true,
        booleanValue: true,
        displayValue: "Bahçe var",
        formattedValue: "Var",
      },
    ],
    activeCampaigns: [
      {
        id: 2,
        title: "Yeni Öğrenci",
        description: "İlk aylık ücretsiz",
        campaignType: "FREE_MONTH",
        discountType: "AMOUNT",
        discountAmount: 1800,
        discountPercentage: 0,
        badgeText: "1 Ay Bedava",
        badgeColor: "#10B981",
        thumbnailImageUrl: "",
        startDate: "2024-01-01",
        endDate: "2024-03-31",
        isActive: true,
      },
    ],
    hasActiveCampaigns: true,
    isSubscribed: true,
    isFavorite: true,
  },
  {
    id: 3,
    name: "Teknik Meslek Lisesi",
    slug: "teknik-meslek-lisesi",
    logoUrl:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581726690015-c9861fa5057f?w=400&h=200&fit=crop&crop=center",
    description: "Meslek sahibi olmak isteyenler için teknik eğitim",
    institutionTypeName: "Meslek Lisesi",
    institutionTypeIcon: "ph-wrench",
    institutionTypeColor: "#F59E0B",
    minAge: 14,
    maxAge: 18,
    ageRange: "14-18 yaş",
    monthlyFee: 1200,
    formattedPrice: "₺1.200",
    ratingAverage: 4.2,
    ratingCount: 56,
    campusName: "Teknik Kampüs",
    address: "Sanayi Mahallesi, Teknoloji Caddesi No:45",
    district: "Pendik",
    city: "İstanbul",
    distanceKm: 8.7,
    highlights: ["Laboratuvar", "Staj İmkanı", "İş Garantisi"],
    cardProperties: [
      {
        id: 5,
        propertyId: 5,
        propertyName: "workshopCount",
        propertyDisplayName: "Atölye Sayısı",
        dataType: "NUMBER",
        showInCard: true,
        showInProfile: true,
        numberValue: 8,
        displayValue: "8 atölye",
        formattedValue: "8",
      },
    ],
    activeCampaigns: [],
    hasActiveCampaigns: false,
    isSubscribed: false,
    isFavorite: false,
  },
  {
    id: 4,
    name: "Modern İlkokul",
    slug: "modern-ilkokul",
    logoUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&h=100&fit=crop&crop=center",
    coverImageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=200&fit=crop&crop=center",
    description: "İlkokul çağındaki çocuklar için modern eğitim yaklaşımı",
    institutionTypeName: "İlkokul",
    institutionTypeIcon: "ph-book-open",
    institutionTypeColor: "#8B5CF6",
    minAge: 6,
    maxAge: 10,
    ageRange: "6-10 yaş",
    monthlyFee: 2000,
    formattedPrice: "₺2.000",
    ratingAverage: 4.6,
    ratingCount: 78,
    campusName: "Ana Kampüs",
    address: "Yeni Mahalle, Bilim Sokak No:22",
    district: "Beşiktaş",
    city: "İstanbul",
    distanceKm: 3.8,
    highlights: ["STEM Eğitimi", "Sanat Atölyesi", "Yüzme Havuzu"],
    cardProperties: [
      {
        id: 6,
        propertyId: 6,
        propertyName: "classSize",
        propertyDisplayName: "Sınıf Mevcudu",
        dataType: "NUMBER",
        showInCard: true,
        showInProfile: true,
        numberValue: 18,
        displayValue: "18 öğrenci",
        formattedValue: "18",
      },
    ],
    activeCampaigns: [
      {
        id: 3,
        title: "Kardeş İndirimi",
        description: "İkinci çocuk %10 indirim",
        campaignType: "SIBLING_DISCOUNT",
        discountType: "PERCENTAGE",
        discountAmount: 0,
        discountPercentage: 10,
        badgeText: "Kardeş %10",
        badgeColor: "#8B5CF6",
        thumbnailImageUrl: "",
        startDate: "2024-01-01",
        endDate: "2024-12-31",
        isActive: true,
      },
    ],
    hasActiveCampaigns: true,
    isSubscribed: false,
    isFavorite: true,
  },
  {
    id: 5,
    name: "Fen Lisesi",
    slug: "fen-lisesi",
    logoUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&h=100&fit=crop&crop=center",
    coverImageUrl:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop&crop=center",
    description: "Fen ve matematik alanında üstün yetenekli öğrenciler için",
    institutionTypeName: "Fen Lisesi",
    institutionTypeIcon: "ph-flask",
    institutionTypeColor: "#EF4444",
    minAge: 14,
    maxAge: 18,
    ageRange: "14-18 yaş",
    monthlyFee: 3000,
    formattedPrice: "₺3.000",
    ratingAverage: 4.9,
    ratingCount: 145,
    campusName: "Bilim Kampüsü",
    address: "Akademi Mahallesi, Einstein Bulvarı No:100",
    district: "Şişli",
    city: "İstanbul",
    distanceKm: 5.2,
    highlights: ["Olimpiyat Hazırlık", "Araştırma Lab", "Üniversite İşbirliği"],
    cardProperties: [
      {
        id: 7,
        propertyId: 7,
        propertyName: "labCount",
        propertyDisplayName: "Laboratuvar",
        dataType: "NUMBER",
        showInCard: true,
        showInProfile: true,
        numberValue: 12,
        displayValue: "12 laboratuvar",
        formattedValue: "12",
      },
    ],
    activeCampaigns: [],
    hasActiveCampaigns: false,
    isSubscribed: true,
    isFavorite: false,
  },
  {
    id: 6,
    name: "Sanat Akademisi",
    slug: "sanat-akademisi",
    logoUrl:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop&crop=center",
    coverImageUrl:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=200&fit=crop&crop=center",
    description:
      "Yaratıcılığını geliştirmek isteyen öğrenciler için sanat eğitimi",
    institutionTypeName: "Sanat Okulu",
    institutionTypeIcon: "ph-paint-brush",
    institutionTypeColor: "#F59E0B",
    minAge: 8,
    maxAge: 18,
    ageRange: "8-18 yaş",
    monthlyFee: 2200,
    formattedPrice: "₺2.200",
    ratingAverage: 4.4,
    ratingCount: 67,
    campusName: "Sanat Merkezi",
    address: "Kültür Mahallesi, Ressam Sokak No:35",
    district: "Beyoğlu",
    city: "İstanbul",
    distanceKm: 6.1,
    highlights: ["Resim Atölyesi", "Müzik Odası", "Sergi Alanı"],
    cardProperties: [
      {
        id: 8,
        propertyId: 8,
        propertyName: "studioCount",
        propertyDisplayName: "Atölye Sayısı",
        dataType: "NUMBER",
        showInCard: true,
        showInProfile: true,
        numberValue: 6,
        displayValue: "6 atölye",
        formattedValue: "6",
      },
    ],
    activeCampaigns: [
      {
        id: 4,
        title: "Yetenek Bursu",
        description: "Portfolyo değerlendirmesi ile %20 burs",
        campaignType: "SCHOLARSHIP",
        discountType: "PERCENTAGE",
        discountAmount: 0,
        discountPercentage: 20,
        badgeText: "Burs",
        badgeColor: "#F59E0B",
        thumbnailImageUrl: "",
        startDate: "2024-01-01",
        endDate: "2024-06-30",
        isActive: true,
      },
    ],
    hasActiveCampaigns: true,
    isSubscribed: false,
    isFavorite: false,
  },
];

// Location filter interface
export interface LocationFilter {
  countryId?: string;
  provinceId?: string;
  districtId?: string;
  neighborhoodId?: string;
}

// Form values interface
export interface SearchFormValues {
  countryId?: string;
  provinceId?: string;
  districtId?: string;
  neighborhoodId?: string;
  [key: string]: unknown;
}

// Hook parameters interface
export interface UseInstitutionSearchHookParams {
  values?: SearchFormValues;
  updateField?: (
    name: string,
    value: string | number | boolean | null | undefined
  ) => Promise<void>;
}

export function useInstitutionSearchHook({
  values = {},
  updateField = async () => {},
}: UseInstitutionSearchHookParams = {}) {
  // Önceki değerleri takip etmek için ref'ler
  const prevCountryId = useRef(values?.countryId);
  const prevProvinceId = useRef(values?.provinceId);
  const prevDistrictId = useRef(values?.districtId);

  // Location filter objesi oluştur
  const locationFilter: LocationFilter = {
    countryId: values?.countryId,
    provinceId: values?.provinceId,
    districtId: values?.districtId,
    neighborhoodId: values?.neighborhoodId,
  };
  const {
    data: countriesResponse,
    loading,
    error,
  } = useGet<ApiResponseDto<CountryDto[]>>(API_ENDPOINTS.LOCATION.COUNTRIES);

  // Provinces API çağrısı - sadece ülke seçildiğinde çalışır
  const {
    data: provincesResponse,
    loading: provincesLoading,
    error: provincesError,
  } = useGet<ApiResponseDto<ProvinceDto[]>>(
    locationFilter?.countryId
      ? API_ENDPOINTS.LOCATION.PROVINCES(locationFilter.countryId)
      : null
  );

  // Districts API çağrısı - sadece il seçildiğinde çalışır
  const {
    data: districtsResponse,
    loading: districtsLoading,
    error: districtsError,
  } = useGet<ApiResponseDto<DistrictDto[]>>(
    locationFilter?.provinceId
      ? API_ENDPOINTS.LOCATION.DISTRICTS(locationFilter.provinceId)
      : null
  );

  // Neighborhoods API çağrısı - sadece ilçe seçildiğinde çalışır
  const {
    data: neighborhoodsResponse,
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  } = useGet<ApiResponseDto<NeighborhoodDto[]>>(
    locationFilter?.districtId
      ? API_ENDPOINTS.LOCATION.NEIGHBORHOODS(locationFilter.districtId)
      : null
  );

  // Transform countries data for autocomplete
  const countries = {
    data: [
      { value: "", label: "Ülke seçin" },
      ...(countriesResponse?.data?.map((country) => ({
        value: country.id?.toString() || "",
        label: country.name || "",
      })) || []),
    ],
    loading: loading,
    error: error,
  };

  // Transform provinces data for autocomplete
  const provinces = {
    data: [
      { value: "", label: "İl seçin" },
      ...(provincesResponse?.data?.map((province) => ({
        value: province.id?.toString() || "",
        label: province.name || "",
      })) || []),
    ],
    loading: provincesLoading,
    error: provincesError,
  };

  // Transform districts data for autocomplete
  const districts = {
    data: [
      { value: "", label: "İlçe seçin" },
      ...(districtsResponse?.data?.map((district) => ({
        value: district.id?.toString() || "",
        label: district.name || "",
      })) || []),
    ],
    loading: districtsLoading,
    error: districtsError,
  };

  // Transform neighborhoods data for autocomplete
  const neighborhoods = {
    data: [
      { value: "", label: "Mahalle seçin" },
      ...(neighborhoodsResponse?.data?.map((neighborhood) => ({
        value: neighborhood.id?.toString() || "",
        label: neighborhood.name || "",
      })) || []),
    ],
    loading: neighborhoodsLoading,
    error: neighborhoodsError,
  };

  useEffect(() => {
    // Ülke değiştiğinde alt seviyeleri sıfırla
    if (values && prevCountryId.current !== values.countryId) {
      prevCountryId.current = values.countryId;

      // Ülke değişti, alt seviyeleri sıfırla
      if (values.provinceId) updateField("provinceId", "");
      if (values.districtId) updateField("districtId", "");
      if (values.neighborhoodId) updateField("neighborhoodId", "");
    }

    if (values && prevProvinceId.current !== values.provinceId) {
      prevProvinceId.current = values.provinceId;

      // İl değişti, alt seviyeleri sıfırla
      if (values.districtId) updateField("districtId", "");
      if (values.neighborhoodId) updateField("neighborhoodId", "");
    }

    if (values && prevDistrictId.current !== values.districtId) {
      prevDistrictId.current = values.districtId;

      // İlçe değişti, mahalle sıfırla
      if (values.neighborhoodId) updateField("neighborhoodId", "");
    }
  }, [values, updateField]);

  // Search functionality
  const {
    submitForm: search,
    loading: searchLoading,
    error: searchError,
  } = usePostForm<SchoolSearchDto, SchoolSearchResultDto>(
    API_ENDPOINTS.INSTITUTIONS.SCHOOLS_SEARCH,
    {
      onSuccess: (data) => {
        console.log("SEARCH başarılı:", data);
      },
      onError: (err) => {
        const msg = typeof err === "string" ? err : String(err);
        console.error("Search hatası:", {
          error: err,
          message: msg,
          timestamp: new Date().toISOString(),
        });
      },
    }
  );

  const locationOptions = {
    countries,
    provinces,
    districts,
    neighborhoods,
  };

  return {
    institutions: mockInstitutions,
    countries,
    provinces,
    districts,
    neighborhoods,
    locationOptions,
    search,
    searchLoading,
    searchError,
  };
}

export default useInstitutionSearchHook;
