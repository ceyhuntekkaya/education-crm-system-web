"use client";

import React from "react";
import { JobPostingsProvider } from "./_shared";

export default function TeacherJobPostingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Teacher için tüm okulların ilanlarını göster
  // SchoolId'ye gerek yok, tüm PUBLISHED ilanlar getirilecek
  return <JobPostingsProvider>{children}</JobPostingsProvider>;
}
