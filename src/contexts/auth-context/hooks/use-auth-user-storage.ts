import { useState, useCallback } from "react";
import { UserDto } from "@/types/dto/user/UserDto";
import { SchoolDto } from "@/types/dto/institution/SchoolDto";

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

  const updateUserSchools = useCallback(
    (school: SchoolDto, variant: "add" | "edit" = "add"): UserDto | null => {
      try {
        const currentUser = getStoredUser();
        if (!currentUser) {
          console.warn("No user found in storage to update schools");
          return null;
        }

        const updatedUserRoles = currentUser.userRoles?.map((role) => ({
          ...role,
          schools:
            variant === "add"
              ? [...(role.schools || []), school]
              : (role.schools || []).map((s) =>
                  s.id === school.id ? school : s
                ),
        }));

        const updatedUser: UserDto = {
          ...currentUser,
          userRoles: updatedUserRoles,
        };

        saveUser(updatedUser);
        return updatedUser;
      } catch (error) {
        console.error("Error updating user schools:", error);
        return null;
      }
    },
    [getStoredUser, saveUser]
  );

  return {
    storedUser,
    saveUser,
    removeUser,
    getStoredUser,
    updateUserSchools,
  };
}
