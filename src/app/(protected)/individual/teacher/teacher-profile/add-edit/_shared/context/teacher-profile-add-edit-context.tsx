"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "@/contexts";
import { useAddTeacherProfile, useEditTeacherProfile } from "../hooks";
import { useTeacherProfileContext } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/contexts";
import type { TeacherProfileAddEditContextValue } from "../types";
import type {
  TeacherProfileCreateDto,
  TeacherProfileUpdateDto,
  TeacherProfileDto,
} from "@/types";

const TeacherProfileAddEditContext = createContext<
  TeacherProfileAddEditContextValue | undefined
>(undefined);

interface TeacherProfileAddEditProviderProps {
  children: React.ReactNode;
}

export function TeacherProfileAddEditProvider({
  children,
}: TeacherProfileAddEditProviderProps) {
  const params = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const { myProfile } = useTeacherProfileContext();

  // URL'den id'yi al
  const profileId = params?.id === "new" ? 0 : Number(params?.id) || 0;
  const isEditMode = profileId > 0;

  // State
  const [isSaving, setIsSaving] = useState(false);

  // Düzenleme modunda myProfile kullan
  const teacherProfile = isEditMode ? myProfile : null;

  // API Hooks
  const { createProfile, isCreating } = useAddTeacherProfile();
  const { updateProfile, isUpdating } = useEditTeacherProfile(profileId);

  // Submit handler - Artık kullanılmayacak, form'dan direkt create/update çağrılacak
  const handleSubmit = useCallback(async (): Promise<void> => {
    setIsSaving(true);
    try {
      // Bu metod artık kullanılmıyor
      // Form'dan direkt postProfile/putProfile çağrılacak
    } catch (error: any) {
      console.error("Submit error:", error);
      showSnackbar(error?.message || "Bir hata oluştu", "error");
    } finally {
      setIsSaving(false);
    }
  }, [showSnackbar]);

  const contextValue: TeacherProfileAddEditContextValue = {
    isEditMode,
    profileId,
    teacherProfile,
    isLoading: false, // Profilim mantığında loading yok
    error: null,
    handleSubmit,
    isSaving: isSaving || isCreating || isUpdating,
    postProfile: createProfile,
    putProfile: updateProfile,
  };

  return (
    <TeacherProfileAddEditContext.Provider value={contextValue}>
      {children}
    </TeacherProfileAddEditContext.Provider>
  );
}

export function useTeacherProfileAddEdit() {
  const context = useContext(TeacherProfileAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useTeacherProfileAddEdit must be used within a TeacherProfileAddEditProvider",
    );
  }
  return context;
}
