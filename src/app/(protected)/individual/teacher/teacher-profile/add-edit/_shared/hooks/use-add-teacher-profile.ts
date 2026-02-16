"use client";

import { useCreateTeacherProfile } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/hooks/api";
import type { TeacherProfileCreateDto, TeacherProfileDto } from "@/types";

/**
 * Yeni profil oluşturma hook'u
 */
export const useAddTeacherProfile = () => {
  const { post, loading, error } = useCreateTeacherProfile();

  const createProfile = async (data: TeacherProfileCreateDto) => {
    const response = await post(data);
    // post already returns the inner data object, so no need to access .data again
    return response || null;
  };

  return {
    createProfile,
    isCreating: loading,
    createError: error,
  };
};
