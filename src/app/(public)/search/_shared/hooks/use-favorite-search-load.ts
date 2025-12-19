import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useFormHook } from "@/hooks";
import { useAuth } from "@/contexts/auth-context";
import { ApiResponseDto, SchoolSearchDto } from "@/types";
import { ParentSearchList, UseFavoriteSearchLoadProps } from "../types";
import { convertToFormValues, cleanApiParams } from "../utils";

/**
 * ⭐ FAVORITE SEARCH LOADER HOOK
 * Favori arama yükleme işlemlerini yönetir
 */
export const useFavoriteSearchLoad = (props?: UseFavoriteSearchLoadProps) => {
  const searchParams = useSearchParams();
  const { updateFields } = useFormHook();
  const { user } = useAuth();
  const { search, institutionTypes } = props || {};
  const favSearchId = searchParams.get("favSearchId");
  const processedRef = useRef<string | null>(null);

  // Favori aramaları çek
  const {
    data: response,
    loading,
    error,
  } = useGet<ApiResponseDto<ParentSearchList[]>>(
    user?.id && favSearchId
      ? API_ENDPOINTS.PARENT_SEARCH_LISTS.GET_LISTS_BY_PARENT(user.id)
      : null
  );

  // Favori arama yükle ve form'u doldur
  useEffect(() => {
    // Favori search ID var mı kontrol et
    if (!favSearchId || processedRef.current === favSearchId) {
      return;
    }

    // API response hazır mı kontrol et
    if (!response?.data || loading) {
      return;
    }

    // Institution types hazır mı kontrol et (PropertyFilters için gerekli)
    if (!institutionTypes || institutionTypes.length === 0) {
      return;
    }

    try {
      const favoriteSearch = response.data.find(
        (item: ParentSearchList) => item.id?.toString() === favSearchId
      );

      if (favoriteSearch?.data) {
        // console.log("⭐ Favori arama yükleniyor:", favoriteSearch.name);

        // Parse edilmiş API data
        const apiData = JSON.parse(favoriteSearch.data);

        // Form formatına dönüştür
        const formData = convertToFormValues(apiData, institutionTypes);

        // Form'u doldur
        updateFields(formData);

        // İşlenmiş olarak işaretle
        processedRef.current = favSearchId;

        // Otomatik arama başlat (daha uzun timeout ile güvenli hale getir)
        if (search) {
          setTimeout(() => {
            const cleanParams = cleanApiParams(apiData);
            // console.log("🔍 Favori aramadan otomatik arama:", cleanParams);
            search(cleanParams);
          }, 500); // 500ms timeout artırıldı
        }

        // console.log("✅ Favori arama başarıyla yüklendi!");
      }
    } catch (error) {
      console.warn("Favori arama parse hatası:", error);
    }
  }, [response, favSearchId, institutionTypes, updateFields, search, loading]);

  // Reset işlemi ayrı useEffect'te
  useEffect(() => {
    if (!favSearchId) {
      processedRef.current = null;
    }
  }, [favSearchId]);

  const favoriteSearch = response?.data?.find(
    (item: ParentSearchList) => item.id?.toString() === favSearchId
  );

  return {
    favoriteSearch,
    loading,
    error,
    isFavoriteSearchLoaded: !!favoriteSearch,
  };
};
