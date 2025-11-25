import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useData } from "@/contexts";
import {
  CreateParentSearchListRequest,
  ParentSearchListResponse,
} from "../types";

/**
 * 💾 SAVE FAVORITE SEARCH HOOK
 * Favori arama kaydetme işlemlerini yönetir
 */
export const useSaveFavoriteSearch = (onSuccess?: () => void) => {
  const { refetchFavoriteSearches } = useData();

  const { mutate, loading, error } = usePost<
    ParentSearchListResponse,
    CreateParentSearchListRequest
  >(API_ENDPOINTS.PARENT_SEARCH_LISTS.CREATE_LIST, {
    onSuccess: (response) => {
      // Favori aramaları yeniden yükle
      refetchFavoriteSearches();

      // Modal'ı kapatmayı biraz geciktir, search effect'lerini engellemek için
      setTimeout(() => {
        onSuccess?.();
      }, 100);
    },
    showSnackbar: true,
  });

  return {
    saveFavoriteSearch: mutate,
    loading,
    error,
  };
};
