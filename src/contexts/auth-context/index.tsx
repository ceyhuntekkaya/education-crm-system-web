"use client";

import { createContext, useContext, ReactNode } from "react";
import { AuthContextType } from "./types";
import { AuthenticationRequest, AuthenticationResponse } from "@/types";
import {
  useAuthState,
  useAuthToken,
  useAuthRolePermissions,
  useAuthLogin,
  useAuthLogout,
  useAuthInitialization,
} from "./hooks";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize all hooks
  const { user, setUser, isLoading, setIsLoading, isAuthenticated } =
    useAuthState();
  const { accessToken, saveToken, removeToken, getStoredToken } =
    useAuthToken();
  const {
    currentRole,
    currentDepartments,
    currentPermissions,
    updateRolePermissions,
    resetRolePermissions,
  } = useAuthRolePermissions();

  // Handle login success
  const handleLoginSuccess = (data: AuthenticationResponse) => {
    setUser(data.user || null);
    if (data.accessToken) {
      saveToken(data.accessToken);
    }
    updateRolePermissions(data.user || null);
  };

  // Handle login error
  const handleLoginError = (error: any) => {
    // Error is already logged in the hook
  };

  // Handle logout success
  const handleLogoutSuccess = () => {
    setUser(null);
    resetRolePermissions();
    removeToken();
  };

  // Handle logout error
  const handleLogoutError = (error: any) => {
    // Error is already logged in the hook
  };

  // Initialize hooks for login and logout
  const { login, loginLoading } = useAuthLogin({
    onLoginSuccess: handleLoginSuccess,
    onLoginError: handleLoginError,
  });

  const { performLogout, logoutLoading } = useAuthLogout({
    onLogoutSuccess: handleLogoutSuccess,
    onLogoutError: handleLogoutError,
  });

  // Initialize auth on app startup
  useAuthInitialization({
    getStoredToken,
    setUser,
    updateRolePermissions,
    setIsLoading,
  });

  const value: AuthContextType = {
    user,
    setIsLoading,
    isLoading: isLoading || loginLoading || logoutLoading,
    login,
    logout: performLogout,
    isAuthenticated,
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
