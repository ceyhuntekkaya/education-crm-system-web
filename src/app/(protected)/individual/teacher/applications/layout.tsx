"use client";

import React from "react";
import { ApplicationsProvider } from "./_shared/contexts";

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

export default function ApplicationsLayout({
  children,
}: ApplicationsLayoutProps) {
  // TODO: Get teacherId from auth context or user profile
  // For now, using a mock teacherId
  const teacherId = 1; // Bu değer gerçek teacher ID ile değiştirilecek

  return (
    <ApplicationsProvider teacherId={teacherId}>
      {children}
    </ApplicationsProvider>
  );
}
