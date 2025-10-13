"use client";
import React from "react";
import { ProtectedGuard } from "@/providers";
import { GuardType } from "@/enums/GuardType";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedGuard guardType={GuardType.PROTECTED}>{children}</ProtectedGuard>
  );
};

export default ProtectedLayout;
