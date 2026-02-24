"use client";

import React from "react";
import { ApplicationDetailProvider } from "./_shared/context";

/**
 * ================================================================================
 * APPLICATION DETAIL LAYOUT (Company)
 * ================================================================================
 * Başvuru detay sayfası için layout
 */

interface ApplicationDetailLayoutProps {
  children: React.ReactNode;
}

export default function ApplicationDetailLayout({
  children,
}: ApplicationDetailLayoutProps) {
  return <ApplicationDetailProvider>{children}</ApplicationDetailProvider>;
}
