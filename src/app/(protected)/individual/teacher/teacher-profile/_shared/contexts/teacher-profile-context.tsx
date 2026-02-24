"use client";

import React, { createContext, useContext } from "react";
import { useAuth } from "@/contexts";
import { useGetTeacherProfileByUserId } from "../hooks/api";
import { useDeleteMyTeacherProfile } from "../hooks/use-delete-teacher-profile";
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
  refetch: () => Promise<any>;
  // Silme işlemi
  deleteProfile: () => Promise<boolean>;
  isDeleting: boolean;
  deleteError: any;
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

  // Backend ApiResponse formatından data'yı çıkar
  const myProfile: TeacherProfileDto | null = data?.data || null;

  // 🗑️ DELETE HOOK - Profil silme
  const {
    deleteProfile: deleteProfileFn,
    isDeleting,
    deleteError,
  } = useDeleteMyTeacherProfile(myProfile?.id || 0);

  // Profil silme işlemi
  const handleDeleteProfile = async (): Promise<boolean> => {
    const success = await deleteProfileFn();
    if (success) {
      // Silme başarılı olduğunda context'i güncelle
      await refetch();
    }
    return success;
  };

  // 🎯 CONTEXT VALUE
  const contextValue: TeacherProfileContextValue = {
    // Kullanıcının profil verisi
    myProfile,
    profileLoading: loading,
    profileError: error,
    refetch,
    // Silme işlemi
    deleteProfile: handleDeleteProfile,
    isDeleting,
    deleteError,
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
