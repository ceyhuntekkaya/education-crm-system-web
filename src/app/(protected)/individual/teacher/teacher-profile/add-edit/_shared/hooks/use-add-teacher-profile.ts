"use client";

import { useCreateTeacherProfile } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/hooks/api";
import type { TeacherProfileCreateDto, TeacherProfileDto } from "@/types";

/**
 * Yeni profil oluşturma hook'u
 */
export const useAddTeacherProfile = () => {
  const { post, loading, error } = useCreateTeacherProfile();

  // executeMutation zaten unwrap ediyor, tekrar .data yapmaya gerek yok
  const createProfile = async (
    data: TeacherProfileCreateDto,
  ): Promise<TeacherProfileDto | null> => {
    const response = await post(data);
    return response || null;
  };

  return {
    createProfile,
    isCreating: loading,
    createError: error,
  };
};
