"use client";
import React, { useState } from "react";
import { ProtectedGuard } from "@/providers";
import { Sidebar } from "@/components";
import { userLayoutNavigation } from "@/routes";
import { GuardType } from "@/enums/GuardType";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedGuard guardType={GuardType.PROTECTED}>{children}</ProtectedGuard>
  );
};

export default ProtectedLayout;
