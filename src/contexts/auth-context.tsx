"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fakeUsers } from "@/types/user/fakeUsers";
import { UserDto } from "@/types/user/UserDto";

interface AuthContextType {
  user: UserDto | null;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; role?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  currentRole: string;
  currentDepartments: string[];
  currentPermissions: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentDepartments, setCurrentDepartments] = useState<string[]>([]);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);

  // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini kontrol et
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          const role =
            parsedUser?.userRoles?.map((roleObj: any) => roleObj.role)[0] || "";
          setCurrentRole(role);
          // Tüm userRoles içindeki departments'ları düz diziye çevir
          const departments = (parsedUser?.userRoles || [])
            .flatMap((roleObj: any) => roleObj.departments || [])
            .map((dep: any) =>
              typeof dep === "string" ? dep : dep.name || dep
            );
          setCurrentDepartments(departments);
          // Tüm userRoles içindeki permissions'ları düz diziye çevir
          const permissions = (parsedUser?.userRoles || [])
            .flatMap((roleObj: any) => roleObj.permissions || [])
            .map((perm: any) =>
              typeof perm === "string" ? perm : perm.name || perm
            );
          setCurrentPermissions(permissions);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; role?: string }> => {
    setIsLoading(true);

    try {
      // Fake API call - gerçek uygulamada API'ye istek atılacak
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simülasyon için delay

      const foundUser = fakeUsers.find((u) => u.email === email);

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));
        const role =
          foundUser?.userRoles?.map((roleObj: any) => roleObj.role)[0] || "";
        setCurrentRole(role);
        const departments = (foundUser?.userRoles || [])
          .flatMap((roleObj: any) => roleObj.departments || [])
          .map((dep: any) => (typeof dep === "string" ? dep : dep.name || dep));
        setCurrentDepartments(departments);
        // Tüm userRoles içindeki permissions'ları düz diziye çevir
        const permissions = (foundUser?.userRoles || [])
          .flatMap((roleObj: any) => roleObj.permissions || [])
          .map((perm: any) =>
            typeof perm === "string" ? perm : perm.name || perm
          );
        setCurrentPermissions(permissions);
        return {
          success: true,
          role,
        };
      }

      setCurrentRole("");
      return {
        success: false,
      };
    } catch (error) {
      console.error("Login error:", error);
      setCurrentRole("");
      return {
        success: false,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentRole("");
    setCurrentDepartments([]);
    localStorage.removeItem("user");
    setCurrentPermissions([]);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    currentRole,
    currentDepartments,
    currentPermissions,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
