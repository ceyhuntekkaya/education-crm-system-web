"use client";

import React from "react";
import { EventAddEditProvider } from "./_shared";

export default function EventAddEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EventAddEditProvider>{children}</EventAddEditProvider>;
}
