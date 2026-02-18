"use client";

import React from "react";
import { JobPostingsProvider } from "./_shared";
import { ApplicationsProvider } from "../applications/_shared/contexts";
import {
  TeacherProfileProvider,
  useTeacherProfileContext,
} from "../teacher-profile/_shared/contexts";

/**
 * JOB POSTINGS LAYOUT
 * Applications provider da eklendi ki başvurulan ilanlar filtrelenebilsin
 */

function JobPostingsLayoutContent({ children }: { children: React.ReactNode }) {
  const { myProfile } = useTeacherProfileContext();
  const teacherId = myProfile?.id || 0;

  return (
    <ApplicationsProvider teacherId={teacherId}>
      <JobPostingsProvider>{children}</JobPostingsProvider>
    </ApplicationsProvider>
  );
}

export default function TeacherJobPostingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Teacher için tüm okulların ilanlarını göster
  // SchoolId'ye gerek yok, tüm PUBLISHED ilanlar getirilecek
  // ApplicationsProvider da eklendi ki başvurulan ilanlar filtrelenebilsin
  return (
    <TeacherProfileProvider>
      <JobPostingsLayoutContent>{children}</JobPostingsLayoutContent>
    </TeacherProfileProvider>
  );
}
