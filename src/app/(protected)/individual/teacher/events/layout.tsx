"use client";

import React from "react";
import { TeacherEventsProvider } from "./_shared/contexts";

/**
 * TEACHER EVENTS LAYOUT
 * Yayındaki etkinliklerin listelendiği sayfa layout'u
 */
export default function TeacherEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TeacherEventsProvider>{children}</TeacherEventsProvider>;
}
