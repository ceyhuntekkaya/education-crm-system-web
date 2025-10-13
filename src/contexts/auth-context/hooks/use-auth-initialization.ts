import { useEffect } from "react";
import { UserDto } from "@/types/dto/user/UserDto";

interface UseAuthInitializationProps {
  getStoredUser: () => UserDto | null;
  getStoredToken: () => string | null;
  setUser: (user: UserDto | null) => void;
  updateRolePermissions: (user: UserDto | null) => void;
  setIsLoading: (loading: boolean) => void;
}

export function useAuthInitialization({
  getStoredUser,
  getStoredToken,
  setUser,
  updateRolePermissions,
  setIsLoading,
}: UseAuthInitializationProps) {
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = getStoredUser();
        const token = getStoredToken();

        // Only set user if both user and token exist
        if (storedUser && token) {
          setUser(storedUser);
          updateRolePermissions(storedUser);
        } else {
          // If either is missing, clear both
          setUser(null);
          updateRolePermissions(null);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setUser(null);
        updateRolePermissions(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount
}
