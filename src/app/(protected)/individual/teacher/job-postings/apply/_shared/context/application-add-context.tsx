"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import type { ApplicationAddContextValue } from "../types";
import { useCreateApplicationForm, useJobPostingById } from "../hooks";
import { useTeacherProfileContext } from "@/app/(protected)/individual/teacher/teacher-profile/_shared/contexts";

/**
 * Başvuru formu için context
 */
const ApplicationAddContext = createContext<
  ApplicationAddContextValue | undefined
>(undefined);

interface ApplicationAddProviderProps {
  children: ReactNode;
}

export function ApplicationAddProvider({
  children,
}: ApplicationAddProviderProps) {
  const params = useParams();
  const { myProfile } = useTeacherProfileContext();

  // Job posting ID from URL
  const jobPostingId = params.jobPostingId
    ? parseInt(params.jobPostingId as string)
    : 0;

  // Get job posting data
  const { data: jobPostingData, loading: jobPostingLoading } =
    useJobPostingById(jobPostingId, { enabled: !!jobPostingId });

  const jobPosting = jobPostingData?.data || null;

  // Create application hook
  const { submitApplication, submitting } = useCreateApplicationForm();

  const contextValue: ApplicationAddContextValue = {
    // Job posting data
    jobPosting,
    jobPostingLoading,

    // Teacher profile ID
    teacherProfileId: myProfile?.id || null,

    // Application submission
    submitApplication,
    submitting,
  };

  return (
    <ApplicationAddContext.Provider value={contextValue}>
      {children}
    </ApplicationAddContext.Provider>
  );
}

export function useApplicationAdd() {
  const context = useContext(ApplicationAddContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationAdd must be used within an ApplicationAddProvider",
    );
  }
  return context;
}
