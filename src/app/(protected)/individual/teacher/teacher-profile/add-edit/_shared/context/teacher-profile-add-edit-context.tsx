"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import type { TeacherProfileAddEditContextValue } from "../types";
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

  const contextValue: TeacherProfileAddEditContextValue = {
    // Current profile data
    teacherProfile,
    profileDetailLoading: isEditMode ? profileLoading : false, // Edit modunda profile yüklenirken
    profileSubmitLoading: isCreating || isUpdating, // Form submit edilirken
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
