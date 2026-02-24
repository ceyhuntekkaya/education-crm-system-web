"use client";

import React from "react";
import { ApplicationsProvider } from "./_shared/contexts";
import {
  TeacherProfileProvider,
  useTeacherProfileContext,
} from "../teacher-profile/_shared/contexts";

/**
 * ================================================================================
 * APPLICATIONS LAYOUT
 * ================================================================================
 * Teacher başvuru modülü için layout
 * Context provider wrapper
 */

interface ApplicationsLayoutProps {
  children: React.ReactNode;
}

function ApplicationsLayoutContent({ children }: ApplicationsLayoutProps) {
  const { myProfile } = useTeacherProfileContext();
  const teacherId = myProfile?.id || 0;

  return (
    <ApplicationsProvider teacherId={teacherId}>
      {children}
    </ApplicationsProvider>
  );
}

export default function ApplicationsLayout({
  children,
}: ApplicationsLayoutProps) {
  return (
    <TeacherProfileProvider>
      <ApplicationsLayoutContent>{children}</ApplicationsLayoutContent>
    </TeacherProfileProvider>
  );
}
