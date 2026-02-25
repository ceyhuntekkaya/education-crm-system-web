"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { useSnackbar } from "@/contexts";
import { useGet, usePost, usePut, useDelete } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type { TeacherProfileAddEditContextValue } from "../types";
import type {
  TeacherEducationDto,
  TeacherEducationCreateDto,
  TeacherEducationUpdateDto,
  TeacherExperienceDto,
  TeacherExperienceCreateDto,
  TeacherExperienceUpdateDto,
  ApiResponseTeacherEducationsArray,
  ApiResponseTeacherExperiencesArray,
} from "@/types";
import {
  useAddTeacherProfile,
  useEditTeacherProfile,
  useProvincesData,
} from "../hooks";
import { useTeacherProfileContext } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/contexts";
import { isValidEditId, parseEditId } from "../utils";

const TeacherProfileAddEditContext = createContext<
  TeacherProfileAddEditContextValue | undefined
>(undefined);

interface TeacherProfileAddEditProviderProps {
  children: ReactNode;
}

export function TeacherProfileAddEditProvider({
  children,
}: TeacherProfileAddEditProviderProps) {
  const params = useParams();
  const { showSnackbar } = useSnackbar();
  const { myProfile, profileLoading } = useTeacherProfileContext();

  // ID parsing and edit mode determination
  const { id } = params;
  const isEditMode = isValidEditId(id);
  const profileId = parseEditId(id);

  // Teacher profile data - use myProfile when editing
  const teacherProfile = isEditMode ? myProfile : null;

  // API Hooks
  const { createProfile, isCreating, createError } = useAddTeacherProfile();

  const { updateProfile, isUpdating, updateError } = useEditTeacherProfile(
    profileId || 0,
  );

  // Location data hooks
  const { cityOptions, provinceOptions, provincesLoading } = useProvincesData();

  // ═══════════════════════════════════════════════════════════════════════════
  // EDUCATION CRUD
  // ═══════════════════════════════════════════════════════════════════════════

  const {
    data: educationsData,
    refetch: refetchEducations,
    loading: isLoadingEducations,
  } = useGet<ApiResponseTeacherEducationsArray>(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.LIST(profileId)
      : null,
    { enabled: !!profileId && isEditMode },
  );

  const { post: postEducation, loading: isCreatingEducation } = usePost<
    TeacherEducationDto,
    TeacherEducationCreateDto
  >(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.CREATE(profileId)
      : "",
  );

  const { mutate: putEducation, loading: isUpdatingEducation } = usePut<
    TeacherEducationDto,
    TeacherEducationUpdateDto & { _educationId: number }
  >((data) =>
    API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.UPDATE(
      profileId || 0,
      data._educationId,
    ),
  );

  const { mutate: removeEducation, loading: isDeletingEducation } = useDelete<
    any,
    number
  >((educationId) =>
    API_ENDPOINTS.HR.TEACHER_PROFILES.EDUCATIONS.DELETE(
      profileId || 0,
      educationId,
    ),
  );

  const educations: TeacherEducationDto[] = educationsData?.data || [];

  const addEducation = async (data: TeacherEducationCreateDto) => {
    const result = await postEducation(data);
    if (!result) throw new Error("İşlem başarısız");
    showSnackbar("Eğitim bilgisi eklendi", "success");
    await refetchEducations();
  };

  const updateEducation = async (
    educationId: number,
    data: TeacherEducationUpdateDto,
  ) => {
    const result = await putEducation({
      ...data,
      _educationId: educationId,
    } as any);
    if (!result) throw new Error("İşlem başarısız");
    showSnackbar("Eğitim bilgisi güncellendi", "success");
    await refetchEducations();
  };

  const deleteEducation = async (educationId: number) => {
    await removeEducation(educationId);
    showSnackbar("Eğitim bilgisi silindi", "success");
    await refetchEducations();
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPERIENCE CRUD
  // ═══════════════════════════════════════════════════════════════════════════

  const {
    data: experiencesData,
    refetch: refetchExperiences,
    loading: isLoadingExperiences,
  } = useGet<ApiResponseTeacherExperiencesArray>(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.LIST(profileId)
      : null,
    { enabled: !!profileId && isEditMode },
  );

  const { post: postExperience, loading: isCreatingExperience } = usePost<
    TeacherExperienceDto,
    TeacherExperienceCreateDto
  >(
    profileId
      ? API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.CREATE(profileId)
      : "",
  );

  const { mutate: putExperience, loading: isUpdatingExperience } = usePut<
    TeacherExperienceDto,
    TeacherExperienceUpdateDto & { _experienceId: number }
  >((data) =>
    API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.UPDATE(
      profileId || 0,
      data._experienceId,
    ),
  );

  const { mutate: removeExperience, loading: isDeletingExperience } = useDelete<
    any,
    number
  >((experienceId) =>
    API_ENDPOINTS.HR.TEACHER_PROFILES.EXPERIENCES.DELETE(
      profileId || 0,
      experienceId,
    ),
  );

  const experiences: TeacherExperienceDto[] = experiencesData?.data || [];

  const addExperience = async (data: TeacherExperienceCreateDto) => {
    const result = await postExperience(data);
    if (!result) throw new Error("İşlem başarısız");
    showSnackbar("Deneyim bilgisi eklendi", "success");
    await refetchExperiences();
  };

  const updateExperience = async (
    experienceId: number,
    data: TeacherExperienceUpdateDto,
  ) => {
    const result = await putExperience({
      ...data,
      _experienceId: experienceId,
    } as any);
    if (!result) throw new Error("İşlem başarısız");
    showSnackbar("Deneyim bilgisi güncellendi", "success");
    await refetchExperiences();
  };

  const deleteExperience = async (experienceId: number) => {
    await removeExperience(experienceId);
    showSnackbar("Deneyim bilgisi silindi", "success");
    await refetchExperiences();
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTEXT VALUE
  // ═══════════════════════════════════════════════════════════════════════════

  const contextValue: TeacherProfileAddEditContextValue = {
    // Current profile data
    teacherProfile,
    profileDetailLoading: isEditMode ? profileLoading : false,
    profileSubmitLoading: isCreating || isUpdating,
    profileError: createError || updateError,

    // Edit mode state
    isEditMode,
    profileId: profileId?.toString() || null,

    // Location options
    cityOptions,
    provinceOptions,
    provincesLoading,

    // Actions
    postProfile: createProfile,
    putProfile: updateProfile,

    // Education
    educations,
    isLoadingEducations,
    addEducation,
    updateEducation,
    deleteEducation,
    isSubmittingEducation: isCreatingEducation || isUpdatingEducation,
    isDeletingEducation,
    refetchEducations,

    // Experience
    experiences,
    isLoadingExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
    isSubmittingExperience: isCreatingExperience || isUpdatingExperience,
    isDeletingExperience,
    refetchExperiences,
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
