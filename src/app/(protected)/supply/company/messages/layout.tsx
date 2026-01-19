"use client";

import React from "react";
import { MessagesProvider } from "./_shared";

/**
 * Messages Layout
 * Wraps the messages page with MessagesProvider context
 */
export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessagesProvider>{children}</MessagesProvider>;
}
