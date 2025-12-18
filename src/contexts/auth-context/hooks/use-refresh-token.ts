import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";

export function useRefreshToken() {
  const {
    mutate: refreshToken,
    loading: refreshLoading,
    error: refreshError,
  } = usePost(API_ENDPOINTS.AUTH.REFRESH_TOKEN, {
    showSnackbar: false, // Token refresh için snackbar gösterme
  });

  return {
    refreshToken,
    refreshLoading,
    refreshError,
  };
}
