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
    return response?.data || null;
  };

  return {
    createProfile,
    isCreating: loading,
    createError: error,
  };
};
