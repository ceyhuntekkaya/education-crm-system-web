import { useState } from "react";
import { UserDto } from "@/types/dto/user/UserDto";

export function useAuthState() {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const resetState = () => {
    setUser(null);
    setIsLoading(false);
  };

  return {
    user,
    setUser,
    isLoading,
    setIsLoading,
    resetState,
    isAuthenticated: !!user,
  };
}
