"use client";

import React from "react";
import { JobPostingDetailProvider } from "./_shared";

export default function JobPostingDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <JobPostingDetailProvider>{children}</JobPostingDetailProvider>;
}
