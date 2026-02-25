"use client";

import { useGet, usePost, usePut, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  TeacherExperienceDto,
  TeacherExperienceCreateDto,
  TeacherExperienceUpdateDto,
  ApiResponseTeacherExperienceDto,
  ApiResponseTeacherExperiencesArray,
} from "@/types";

// ==================== GET EXPERIENCES ====================
export const useGetTeacherExperiences = (
  profileId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseTeacherExperiencesArray>(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.LIST(profileId)
      : null,
    {
      enabled: options?.enabled ?? !!profileId,
    },
  );
};

// ==================== CREATE EXPERIENCE ====================
export const useCreateTeacherExperience = (profileId: number) => {
  return usePost<TeacherExperienceDto, TeacherExperienceCreateDto>(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.CREATE(profileId)
      : "",
  );
};

// ==================== UPDATE EXPERIENCE ====================
export const useUpdateTeacherExperience = (
  profileId: number,
  experienceId: number,
) => {
  return usePut<TeacherExperienceDto, TeacherExperienceUpdateDto>(
    profileId && experienceId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.UPDATE(
          profileId,
          experienceId,
        )
      : "",
  );
};

// ==================== DELETE EXPERIENCE ====================
export const useDeleteTeacherExperience = (
  profileId: number,
  experienceId: number,
) => {
  return useDelete(
    profileId && experienceId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.DELETE(
          profileId,
          experienceId,
        )
      : "",
  );
};
