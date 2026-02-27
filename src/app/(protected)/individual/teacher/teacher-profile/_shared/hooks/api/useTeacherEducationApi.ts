"use client";

import { useGet, usePost, usePut, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  TeacherEducationDto,
  TeacherEducationCreateDto,
  TeacherEducationUpdateDto,
  ApiResponseTeacherEducationDto,
  ApiResponseTeacherEducationsArray,
} from "@/types";

// ==================== GET EDUCATIONS ====================
export const useGetTeacherEducations = (
  profileId: number,
  options?: { enabled?: boolean },
) => {
  return useGet<ApiResponseTeacherEducationsArray>(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.LIST(profileId)
      : null,
    {
      enabled: options?.enabled ?? !!profileId,
    },
  );
};

// ==================== CREATE EDUCATION ====================
export const useCreateTeacherEducation = (profileId: number) => {
  return usePost<TeacherEducationDto, TeacherEducationCreateDto>(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.CREATE(profileId)
      : "",
  );
};

// ==================== UPDATE EDUCATION ====================
export const useUpdateTeacherEducation = (
  profileId: number,
  educationId: number,
) => {
  return usePut<TeacherEducationDto, TeacherEducationUpdateDto>(
    profileId && educationId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.UPDATE(
          profileId,
          educationId,
        )
      : "",
  );
};

// ==================== DELETE EDUCATION ====================
export const useDeleteTeacherEducation = (
  profileId: number,
  educationId: number,
) => {
  return useDelete(
    profileId && educationId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.DELETE(
          profileId,
          educationId,
        )
      : "",
  );
};
