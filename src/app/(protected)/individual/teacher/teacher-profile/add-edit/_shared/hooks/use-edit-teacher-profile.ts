"use client";

import { useUpdateTeacherProfile } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/hooks/api";
import type { TeacherProfileUpdateDto, TeacherProfileDto } from "@/types";

/**
 * Profil güncelleme hook'u
 * @param profileId - Profil ID'si
 */
export const useEditTeacherProfile = (profileId: number) => {
  const { mutate, loading, error } = useUpdateTeacherProfile(profileId);

  const updateProfile = async (data: TeacherProfileUpdateDto) => {
    const response = await mutate(data);
    return response?.data || null;
  };

  return {
    updateProfile,
    isUpdating: loading,
    updateError: error,
  };
};
