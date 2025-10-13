import { useState, useCallback } from "react";
import { UserDto } from "@/types/dto/user/UserDto";

const USER_STORAGE_KEY = "user";

export function useAuthUserStorage() {
  const [storedUser, setStoredUser] = useState<UserDto | null>(null);

  const saveUser = useCallback((user: UserDto) => {
    setStoredUser(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }, []);

  const removeUser = useCallback(() => {
    setStoredUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  const getStoredUser = useCallback((): UserDto | null => {
    try {
      const user = localStorage.getItem(USER_STORAGE_KEY);
      if (user) {
        const parsedUser = JSON.parse(user) as UserDto;
        setStoredUser(parsedUser);
        return parsedUser;
      }
    } catch (error) {
      console.error("User storage get error:", error);
      removeUser();
    }

    return null;
  }, [removeUser]);

  return {
    storedUser,
    saveUser,
    removeUser,
    getStoredUser,
  };
}
