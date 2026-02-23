"use client";

import React from "react";
import { EventDetailProvider } from "./_shared/context/event-detail-context";

export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EventDetailProvider>{children}</EventDetailProvider>;
}
