"use client";

import { createContext, useContext, ReactNode } from "react";
import { AuthContextType } from "./types";
import { AuthenticationRequest, AuthenticationResponse } from "@/types";
import {
  useAuthState,
  useAuthToken,
  useAuthUserStorage,
  useAuthRolePermissions,
  useAuthLogin,
  useAuthLogout,
  useAuthInitialization,
  usePostLoginRedirect,
} from "./hooks";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize all hooks
  const { user, setUser, isLoading, setIsLoading, isAuthenticated } =
    useAuthState();
  const { accessToken, saveToken, removeToken, getStoredToken } =
    useAuthToken();
  const { saveUser, removeUser, getStoredUser, updateUserSchools } =
    useAuthUserStorage();
  const {
    currentRole,
    currentDepartments,
    currentPermissions,
    updateRolePermissions,
    resetRolePermissions,
  } = useAuthRolePermissions();

  // Post-login redirect hook
  const { checkAndRedirect } = usePostLoginRedirect();

  // Handle login success
  const handleLoginSuccess = (data: AuthenticationResponse) => {
    const userData = data.user || null;

    // Save both user and token
    if (userData) {
      setUser(userData);
      saveUser(userData);
      updateRolePermissions(userData);

      // Login sonrası kullanıcı bilgilerine göre yönlendirme kontrolü
      // Eğer yönlendirme yapıldıysa, bunu response'a ekle
      const wasRedirected = checkAndRedirect(userData);

      // Response'a yönlendirme bilgisini ekle
      (data as any).wasRedirectedToRegistration = wasRedirected;
    }

    if (data.accessToken) {
      saveToken(data.accessToken);
    }
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
    removeUser();
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
    getStoredUser,
    getStoredToken,
    setUser,
    updateRolePermissions,
    setIsLoading,
  });

  // Wrapper for updateUserSchools to also update context state
  const handleUpdateUserSchools = (
    school: any,
    variant: "add" | "edit" = "add"
  ) => {
    console.log("gelen data güncellencek ==> ", school);

    const updatedUser = updateUserSchools(school, variant);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const value: AuthContextType = {
    user,
    setUser,
    setIsLoading,
    isLoading: isLoading || loginLoading || logoutLoading,
    login,
    logout: performLogout,
    isAuthenticated,
    currentRole,
    currentDepartments,
    currentPermissions,
    accessToken,
    updateUserSchools: handleUpdateUserSchools,
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
