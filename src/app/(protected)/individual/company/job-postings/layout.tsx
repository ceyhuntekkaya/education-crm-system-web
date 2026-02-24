"use client";

import React from "react";
import { useAuth } from "@/contexts";
import { JobPostingsProvider } from "./_shared";

export default function CompanyJobPostingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  // User'ın ilişkili olduğu school ID'sini al
  const schoolId = user?.institutionAccess?.[0]?.entityId || 1;

  return (
    <JobPostingsProvider schoolId={schoolId}>{children}</JobPostingsProvider>
  );
}
