"use client";

import React from "react";
import { ApplicationAddProvider } from "./_shared";
import { TeacherProfileProvider } from "../../teacher-profile/_shared/contexts";

/**
 * Başvuru formu layout
 */
export default function ApplicationAddLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeacherProfileProvider>
      <ApplicationAddProvider>{children}</ApplicationAddProvider>
    </TeacherProfileProvider>
  );
}
