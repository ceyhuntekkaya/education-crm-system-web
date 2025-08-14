"use client";

import { ProtectedRoute } from "@/guards";
import { ROLES } from "@/types/roles";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute roles={[ROLES.USER]}>{children}</ProtectedRoute>;
}
