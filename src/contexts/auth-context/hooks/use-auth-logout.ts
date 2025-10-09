import { useState } from "react";

interface UseAuthLogoutProps {
  onLogoutSuccess: () => void;
  onLogoutError: (error: any) => void;
}

export function useAuthLogout({
  onLogoutSuccess,
  onLogoutError,
}: UseAuthLogoutProps) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [logoutError, setLogoutError] = useState<any>(null);

  const performLogout = async () => {
    try {
      setLogoutLoading(true);
      setLogoutError(null);

      // Tüm localStorage'ı temizle
      localStorage.clear();

      // Auth state'leri temizle
      onLogoutSuccess();

      console.log("Logout başarılı - Tüm localStorage temizlendi");
    } catch (error) {
      console.error("Logout error:", error);
      setLogoutError(error);
      onLogoutError(error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return {
    performLogout,
    logoutLoading,
    logoutError,
  };
}
