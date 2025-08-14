"use client";

import { ProtectedRoute } from "@/guards";
import { ROLES } from "@/types/roles";

export default function InstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute roles={[ROLES.INSTITUTION]}>{children}</ProtectedRoute>
  );
}
