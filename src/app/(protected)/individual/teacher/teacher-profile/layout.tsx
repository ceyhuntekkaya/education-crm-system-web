"use client";

import React from "react";
import { TeacherProfileProvider } from "./_shared/contexts";

interface TeacherProfileLayoutProps {
  children: React.ReactNode;
}

export default function TeacherProfileLayout({
  children,
}: TeacherProfileLayoutProps) {
  return <TeacherProfileProvider>{children}</TeacherProfileProvider>;
}
