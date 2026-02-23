"use client";

import React from "react";
import { EventsProvider } from "./_shared";

export default function InstructorEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EventsProvider>{children}</EventsProvider>;
}
