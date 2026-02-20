"use client";

import React from "react";
import { OrganizerAddEditProvider } from "./_shared";

export default function OrganizerAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizerAddEditProvider>{children}</OrganizerAddEditProvider>;
}
