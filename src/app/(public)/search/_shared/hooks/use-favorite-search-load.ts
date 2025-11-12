import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useFormHook } from "@/hooks";
import { useAuth } from "@/contexts/auth-context";
import { ParentSearchList } from "../types/parent-search-list";
import {
  ApiResponseDto,
  SchoolSearchDto,
  InstitutionTypeListDto,
  PropertyGroupTypeDto,
  PropertyTypeDto,
} from "@/types";
import { createApiParams, cleanApiParams } from "../utils";

interface UseFavoriteSearchLoadProps {
  search?: (data: SchoolSearchDto) => Promise<any>;
  institutionTypes?: any[];
  hasTriggeredUrlSearchRef?: React.MutableRefObject<boolean>; // URL search ref'ini alacak
  setIsFavoriteLoading?: (loading: boolean) => void; // Favori yüklenme durumu
}

// API formatını form formatına dönüştüren yardımcı fonksiyon
const convertApiParamsToFormValues = (
  apiParams: SchoolSearchDto,
  institutionTypes?: any[]
): Record<string, any> => {
  const formValues: Record<string, any> = {
    searchTerm: apiParams.searchTerm || "",
    institutionTypeId: apiParams.institutionTypeIds?.[0]?.toString() || "",
    institutionTypeIds:
      apiParams.institutionTypeIds?.map((id) => id.toString()) || [],
    ageRange: [apiParams.minAge || 1, apiParams.maxAge || 80],
    feeRange: [apiParams.minFee || 1, apiParams.maxFee || 1000000],
    curriculumType: apiParams.curriculumType || "",
    languageOfInstruction: apiParams.languageOfInstruction || "",
    countryId: apiParams.countryId?.toString() || "",
    provinceId: apiParams.provinceId?.toString() || "",
    districtId: apiParams.districtId?.toString() || "",
    neighborhoodId: apiParams.neighborhoodId?.toString() || "",
    latitude: apiParams.latitude || 0,
    longitude: apiParams.longitude || 0,
    radiusKm: apiParams.radiusKm || null,
    minRating: apiParams.minRating?.toString() || "",
    hasActiveCampaigns: apiParams.hasActiveCampaigns || "",
    isSubscribed: apiParams.isSubscribed || "",
    sortBy: apiParams.sortBy || "",
    sortDirection: apiParams.sortDirection || "",
  };

  // PropertyFilters'ı form formatına dönüştür
  if (
    apiParams.propertyFilters &&
    apiParams.propertyFilters.length > 0 &&
    institutionTypes
  ) {
    const selectedPropertyIds = apiParams.propertyFilters;

    console.log("Backend'den gelen propertyFilters:", selectedPropertyIds);

    // Her institution type ve grup için kontrol et
    institutionTypes.forEach((institutionType) => {
      institutionType.propertyGroupTypeDtos?.forEach(
        (group: PropertyGroupTypeDto) => {
          const groupFieldName = group.name || `property_group_${group.id}`;
          const groupSelectedProperties: string[] = [];

          // Bu grup için seçili property'leri bul
          group.propertyTypes?.forEach((property: PropertyTypeDto) => {
            if (property.id && selectedPropertyIds.includes(property.id)) {
              groupSelectedProperties.push(property.id.toString());
            }
          });

          // Eğer bu grup için seçili property varsa form'a ekle
          if (groupSelectedProperties.length > 0) {
            if (group.isMultiple === false) {
              // Tekli seçim için ilk elemanı al
              formValues[groupFieldName] = groupSelectedProperties[0];
            } else {
              // Çoklu seçim için array ver
              formValues[groupFieldName] = groupSelectedProperties;
            }

            console.log(
              `Grup ${group.displayName} (${groupFieldName}):`,
              groupSelectedProperties
            );
          }
        }
      );
    });
  }

  return formValues;
};

export const useFavoriteSearchLoad = (props?: UseFavoriteSearchLoadProps) => {
  const searchParams = useSearchParams();
  const { updateFields, values } = useFormHook();
  const { user } = useAuth();
  const {
    search,
    institutionTypes,
    hasTriggeredUrlSearchRef,
    setIsFavoriteLoading,
  } = props || {};
  const favSearchId = searchParams.get("favSearchId");
  const processedRef = useRef<string | null>(null);
  const shouldTriggerSearchRef = useRef<boolean>(false);
  const triggerSearchDataRef = useRef<any>(null);

  // Kullanıcının tüm favori aramalarını çek
  const {
    data: response,
    loading,
    error,
  } = useGet<ApiResponseDto<ParentSearchList[]>>(
    user?.id && favSearchId
      ? API_ENDPOINTS.PARENT_SEARCH_LISTS.GET_LISTS_BY_PARENT(user.id)
      : null
  );

  useEffect(() => {
    // Aynı favSearchId'yi tekrar işlemeyi önle
    if (response?.data && favSearchId && processedRef.current !== favSearchId) {
      try {
        // favSearchId'ye eşleşen favori aramayı bul
        const favoriteSearch = response.data.find(
          (item) => item.id?.toString() === favSearchId
        );

        if (favoriteSearch && favoriteSearch.data) {
          console.log(
            "Favori arama yükleniyor, institution change clearing'i devre dışı bırakılıyor..."
          );

          // Favori yüklenmeye başladığını bildir
          if (setIsFavoriteLoading) {
            setIsFavoriteLoading(true);
          }

          // Favori aramanın data field'ındaki JSON string'i parse et
          // Artık backend'den API formatında gelecek, form formatına dönüştürme gerekmez
          const searchData = JSON.parse(favoriteSearch.data);

          console.log("Backend'den gelen API format data:", searchData);

          // API formatındaki data'yı form formatına dönüştür
          const formData = convertApiParamsToFormValues(
            searchData,
            institutionTypes
          );

          console.log("Form formatına dönüştürülmüş data:", formData);

          // Form'u bu verilerle doldur
          updateFields(formData);

          // Bu favSearchId'yi işlenmiş olarak işaretle
          processedRef.current = favSearchId;

          // Form güncellendikten sonra arama tetiklenmeli (API formatı direkt kullan)
          shouldTriggerSearchRef.current = true;
          triggerSearchDataRef.current = searchData; // API formatını sakla

          console.log("Favori arama yüklendi:", favoriteSearch.name);

          // Küçük delay sonrası favori yüklenme bitti
          setTimeout(() => {
            if (setIsFavoriteLoading) {
              setIsFavoriteLoading(false);
            }
            console.log(
              "Favori arama yüklenme tamamlandı, institution change clearing'i yeniden aktif."
            );
          }, 200);
        } else {
          console.error("Favori arama bulunamadı:", favSearchId);
        }
      } catch (error) {
        console.error("Favori arama data parse edilemedi:", error);
      }
    }

    // favSearchId değiştiğinde processed ref'i sıfırla
    if (!favSearchId) {
      processedRef.current = null;
      shouldTriggerSearchRef.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, favSearchId]);

  // Form güncellendiğinde ve institutionTypes hazır olduğunda arama tetikle
  useEffect(() => {
    if (
      shouldTriggerSearchRef.current &&
      triggerSearchDataRef.current &&
      search &&
      favSearchId &&
      institutionTypes &&
      institutionTypes.length > 0
    ) {
      try {
        // Küçük delay ile arama yap (form update'in tamamlanmasını bekle)
        const timer = setTimeout(() => {
          // Kaydettiğimiz API formatını direkt kullan
          const cleanParams = cleanApiParams(triggerSearchDataRef.current);

          console.log(
            "Favori arama sonrası otomatik arama başlatılıyor (direkt API format):",
            cleanParams
          );

          // Arama yap
          search(cleanParams);

          // URL search'ün de yapılmasını engelle
          if (hasTriggeredUrlSearchRef) {
            hasTriggeredUrlSearchRef.current = true;
          }

          // Arama tetiklendi, flag'i sıfırla
          shouldTriggerSearchRef.current = false;
          triggerSearchDataRef.current = null;
        }, 100); // 100ms delay

        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Favori arama sonrası arama tetikleme hatası:", error);
        shouldTriggerSearchRef.current = false;
        triggerSearchDataRef.current = null;
      }
    }
  }, [
    search,
    favSearchId,
    institutionTypes,
    hasTriggeredUrlSearchRef,
    setIsFavoriteLoading,
  ]);

  const favoriteSearch = response?.data?.find(
    (item) => item.id?.toString() === favSearchId
  );

  return {
    favoriteSearch,
    loading,
    error,
    isFavoriteSearchLoaded: !!favoriteSearch,
  };
};
