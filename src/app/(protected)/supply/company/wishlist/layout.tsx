"use client";

import React from "react";
import { WishlistProvider } from "./_shared";

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WishlistProvider>{children}</WishlistProvider>;
}
