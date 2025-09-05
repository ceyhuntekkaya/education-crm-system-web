"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserDto } from "@/types/dto/user/UserDto";
import { usePostForm } from "@/hooks";
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from "@/lib";
import { AuthContextType } from "./types";
import { AuthenticationRequest, AuthenticationResponse } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentDepartments, setCurrentDepartments] = useState<string[]>([]);
  const [currentPermissions, setCurrentPermissions] = useState<string[]>([]);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const parsedToken = JSON.parse(token);
          const decoded: any = jwtDecode(parsedToken);
          if (decoded && decoded.user) {
            setUser(decoded.user as UserDto);
            setCurrentRole(decoded.user.userRoles?.[0]?.role || "");
            setCurrentDepartments(
              decoded.user.userRoles?.[0]?.departments?.map((dep: any) =>
                typeof dep === "string" ? dep : dep.name || dep
              ) || []
            );
            setCurrentPermissions(
              decoded.user.userRoles?.[0]?.permissions?.map((perm: any) =>
                typeof perm === "string" ? perm : perm.name || perm
              ) || []
            );
          } else {
            setUser(decoded as UserDto);
            setCurrentRole(decoded.userRoles?.[0]?.role || "");
            setCurrentDepartments(
              decoded.userRoles?.[0]?.departments?.map((dep: any) =>
                typeof dep === "string" ? dep : dep.name || dep
              ) || []
            );
            setCurrentPermissions(
              decoded.userRoles?.[0]?.permissions?.map((perm: any) =>
                typeof perm === "string" ? perm : perm.name || perm
              ) || []
            );
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("accessToken");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const {
    submitForm: login,
    loading: loginLoading,
    error: loginError,
  } = usePostForm<AuthenticationRequest, AuthenticationResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    {
      onSuccess: (data) => {
        console.log("login başarılı:", data);
        setUser(data.user || null); // Handle undefined case
        setAccessToken(data.accessToken ?? null);
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        setCurrentRole(data.user?.userRoles?.[0]?.role || "");
        setCurrentDepartments(
          data.user?.userRoles?.[0]?.departments?.map((dep: any) =>
            typeof dep === "string" ? dep : dep.name || dep
          ) || []
        );
        setCurrentPermissions(
          data.user?.userRoles?.[0]?.permissions?.map((perm: any) =>
            typeof perm === "string" ? perm : perm.name || perm
          ) || []
        );
      },
      onError: (err) => {
        const msg = typeof err === "string" ? err : String(err);
        console.error("Login hatası:", {
          error: err,
          message: msg,
          timestamp: new Date().toISOString(),
        });
      },
    }
  );

  const {
    submitForm: logout,
    loading: logoutLoading,
    error: logoutError,
  } = usePostForm<null, null>(API_ENDPOINTS.AUTH.LOGOUT, {
    onSuccess: (data) => {
      setUser(null);
      setCurrentRole("");
      setCurrentDepartments([]);
      setCurrentPermissions([]);
      setAccessToken(null);
      localStorage.removeItem("accessToken");
    },
    onError: (err) => {
      const msg = typeof err === "string" ? err : String(err);
      console.log("login başarısız:", msg);
    },
  });

  const value: AuthContextType = {
    user,
    setIsLoading,
    isLoading: isLoading || loginLoading || logoutLoading,
    login,
    logout: () => logout(null),
    isAuthenticated: !!user,
    currentRole,
    currentDepartments,
    currentPermissions,
    accessToken,
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
