"use client";

import { useUpdateTeacherProfile } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/hooks/api";
import type { TeacherProfileUpdateDto, TeacherProfileDto } from "@/types";

/**
 * Profil güncelleme hook'u
 * @param profileId - Profil ID'si
 */
export const useEditTeacherProfile = (profileId: number) => {
  const { mutate, loading, error } = useUpdateTeacherProfile(profileId);

  // executeMutation zaten unwrap ediyor, tekrar .data yapmaya gerek yok
  const updateProfile = async (
    data: TeacherProfileUpdateDto,
  ): Promise<TeacherProfileDto | null> => {
    const response = await mutate(data);
    return response || null;
  };

  return {
    updateProfile,
    isUpdating: loading,
    updateError: error,
  };
};
