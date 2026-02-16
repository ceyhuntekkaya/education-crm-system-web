"use client";

import React, { createContext, useContext } from "react";
import { useAuth } from "@/contexts";
import { useGetTeacherProfileByUserId } from "../hooks/api";
import type { TeacherProfileDto } from "@/types";

/**
 * 🔍 TEACHER PROFILE CONTEXT
 * Kullanıcının kendi profil verisi
 * - Kendi profili (JWT'den userId ile)
 * - Tek profil mantığı (bir öğretmen 1 profil)
 */

interface TeacherProfileContextValue {
  // Kullanıcının profil verisi
  myProfile: TeacherProfileDto | null;
  profileLoading: boolean;
  profileError: any;
  refetch: () => void;
}

interface TeacherProfileProviderProps {
  children: React.ReactNode;
}

const TeacherProfileContext = createContext<
  TeacherProfileContextValue | undefined
>(undefined);

export function TeacherProfileProvider({
  children,
}: TeacherProfileProviderProps) {
  // 🔐 AUTH - Kullanıcı bilgisi
  const { user } = useAuth();

  // 📊 API DATA - Kullanıcının kendi profili
  const { data, loading, error, refetch } = useGetTeacherProfileByUserId(
    user?.id || 0,
    { enabled: !!user?.id },
  );

  // Raw API verisini TeacherProfileDto formatına dönüştür
  const myProfile: TeacherProfileDto | null = data?.data || null;

  // 🎯 CONTEXT VALUE
  const contextValue: TeacherProfileContextValue = {
    // Kullanıcının profil verisi
    myProfile,
    profileLoading: loading,
    profileError: error,
    refetch,
  };

  return (
    <TeacherProfileContext.Provider value={contextValue}>
      {children}
    </TeacherProfileContext.Provider>
  );
}

// Hook to use TeacherProfileContext
export function useTeacherProfileContext() {
  const context = useContext(TeacherProfileContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherProfileContext must be used within a TeacherProfileProvider",
    );
  }
  return context;
}
