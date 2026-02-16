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
    console.log("useEditTeacherProfile - Sending data:", data);
    const response = await mutate(data);
    console.log("useEditTeacherProfile - Response:", response);
    // mutate already returns the inner data object, so no need to access .data again
    return response || null;
  };

  return {
    updateProfile,
    isUpdating: loading,
    updateError: error,
  };
};
