import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { useAuth } from "@/contexts/auth-context";
import { ParentSearchList } from "../types/parent-search-list";
import { ApiResponseDto } from "@/types";

export const useFavoriteSearchLists = () => {
  const { user } = useAuth();

  const { data, error, loading, refetch } = useGet<
    ApiResponseDto<ParentSearchList[]>
  >(
    user?.id
      ? API_ENDPOINTS.PARENT_SEARCH_LISTS.GET_LISTS_BY_PARENT(user.id)
      : null
  );

  return {
    searchLists: data?.data ?? [],
    totalCount: data?.data?.length ?? 0,
    loading,
    error,
    refetch,
  };
};
