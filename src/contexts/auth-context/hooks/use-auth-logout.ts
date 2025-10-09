import { usePostForm } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";

interface UseAuthLogoutProps {
  onLogoutSuccess: () => void;
  onLogoutError: (error: any) => void;
}

export function useAuthLogout({ onLogoutSuccess, onLogoutError }: UseAuthLogoutProps) {
  const {
    submitForm: logout,
    loading: logoutLoading,
    error: logoutError,
  } = usePostForm<null, null>(API_ENDPOINTS.AUTH.LOGOUT, {
    onSuccess: () => {
      onLogoutSuccess();
    },
    onError: (err) => {
      const msg = typeof err === "string" ? err : String(err);
      console.log("logout başarısız:", msg);
      onLogoutError(err);
    },
  });

  const performLogout = () => logout(null);

  return {
    performLogout,
    logoutLoading,
    logoutError,
  };
}
