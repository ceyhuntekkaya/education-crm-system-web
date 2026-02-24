"use client";

import React from "react";
import { useAuth } from "@/contexts";
import { JobPostingAddEditProvider } from "./_shared";

export default function JobPostingAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  // User'ın ilişkili olduğu school ID'sini al
  const schoolId = user?.institutionAccess?.[0]?.entityId || 1;

  return (
    <JobPostingAddEditProvider schoolId={schoolId}>
      {children}
    </JobPostingAddEditProvider>
  );
}
