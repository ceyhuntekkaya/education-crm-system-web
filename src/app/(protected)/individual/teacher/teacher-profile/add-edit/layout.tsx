"use client";

import React from "react";
import { TeacherProfileAddEditProvider } from "./_shared";

interface TeacherProfileAddEditLayoutProps {
  children: React.ReactNode;
}

export default function TeacherProfileAddEditLayout({
  children,
}: TeacherProfileAddEditLayoutProps) {
  return (
    <TeacherProfileAddEditProvider>{children}</TeacherProfileAddEditProvider>
  );
}
