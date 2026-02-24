"use client";

import React from "react";
import { OrganizerDetailProvider } from "./_shared/context/organizer-detail-context";

export default function OrganizerDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerDetailProvider>{children}</OrganizerDetailProvider>;
}
