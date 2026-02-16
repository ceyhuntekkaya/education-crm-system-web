"use client";

import { useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";

/**
 * Profil silme hook'u
 * useDelete kullanarak teacher profile silme işlemi
 */
export const useDeleteMyTeacherProfile = (teacherProfileId: number) => {
  // useDelete hook'unu kullan
  const { mutate, loading, error } = useDelete(
    teacherProfileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.DELETE(teacherProfileId)
      : "",
  );

  // Delete işlemini unwrap et
  const deleteProfile = async (): Promise<boolean> => {
    try {
      // mutate fonksiyonu boş bir object veya null bekler (DELETE request için body gerekmez)
      await mutate({} as any);
      return true;
    } catch (error) {
      console.error("Delete profile error:", error);
      return false;
    }
  };

  return {
    deleteProfile,
    isDeleting: loading,
    deleteError: error,
  };
};
