import { useEffect } from "react";
import { UserDto } from "@/types/dto/user/UserDto";

interface UseAuthInitializationProps {
  getStoredToken: () => { token: string | null; decodedUser: UserDto | null };
  setUser: (user: UserDto | null) => void;
  updateRolePermissions: (user: UserDto | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export function useAuthInitialization({
  getStoredToken,
  setUser,
  updateRolePermissions,
  setIsLoading,
}: UseAuthInitializationProps) {
  useEffect(() => {
    const checkAuth = () => {
      try {
        const { decodedUser } = getStoredToken();
        
        if (decodedUser) {
          setUser(decodedUser);
          updateRolePermissions(decodedUser);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount
}
