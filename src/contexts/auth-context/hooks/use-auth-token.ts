import { useState, useCallback } from "react";

export function useAuthToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const saveToken = useCallback((token: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", JSON.stringify(token));
  }, []);

  const removeToken = useCallback(() => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  }, []);

  const getStoredToken = useCallback((): string | null => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const parsedToken = JSON.parse(token);
        setAccessToken(parsedToken);
        return parsedToken;
      }
    } catch (error) {
      console.error("Token get error:", error);
      removeToken();
    }

    return null;
  }, [removeToken]);

  return {
    accessToken,
    setAccessToken,
    saveToken,
    removeToken,
    getStoredToken,
  };
}
