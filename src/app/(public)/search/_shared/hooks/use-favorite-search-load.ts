import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useFormHook } from "@/hooks";
import { ParentSearchList } from "../types/parent-search-list";
import { ApiResponseDto } from "@/types";

export const useFavoriteSearchLoad = () => {
  const searchParams = useSearchParams();
  const { updateFields } = useFormHook();
  const favSearchId = searchParams.get("favSearchId");

  const {
    data: response,
    loading,
    error,
  } = useGet<ApiResponseDto<ParentSearchList>>(
    favSearchId
      ? API_ENDPOINTS.PARENT_SEARCH_LISTS.LIST_BY_ID(favSearchId)
      : null
  );

  useEffect(() => {
    if (response?.data && response.data.data) {
      try {
        // Favori aramanın data field'ındaki JSON string'i parse et
        const searchData = JSON.parse(response.data.data);

        // Form'u bu verilerle doldur
        updateFields(searchData);

        console.log("Favori arama yüklendi:", response.data.name, searchData);
      } catch (error) {
        console.error("Favori arama data parse edilemedi:", error);
      }
    }
  }, [response, updateFields]);

  return {
    favoriteSearch: response?.data,
    loading,
    error,
    isFavoriteSearchLoaded: !!response?.data,
  };
};
