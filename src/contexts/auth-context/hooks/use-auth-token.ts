import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { UserDto } from "@/types/dto/user/UserDto";

export function useAuthToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const saveToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", JSON.stringify(token));
  };

  const removeToken = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  const getStoredToken = (): { token: string | null; decodedUser: UserDto | null } => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const parsedToken = JSON.parse(token);
        const decoded: any = jwtDecode(parsedToken);
        
        // Handle both nested user object and direct user data
        const userData = decoded.user || decoded;
        
        return {
          token: parsedToken,
          decodedUser: userData as UserDto,
        };
      }
    } catch (error) {
      console.error("Token decode error:", error);
      removeToken();
    }
    
    return { token: null, decodedUser: null };
  };

  return {
    accessToken,
    setAccessToken,
    saveToken,
    removeToken,
    getStoredToken,
  };
}
