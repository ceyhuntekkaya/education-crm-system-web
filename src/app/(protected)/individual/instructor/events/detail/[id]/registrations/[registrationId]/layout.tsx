"use client";

import React from "react";
import { RegistrationDetailProvider } from "./_shared/context/registration-detail-context";

interface RegistrationDetailLayoutProps {
  children: React.ReactNode;
}

const RegistrationDetailLayout: React.FC<RegistrationDetailLayoutProps> = ({
  children,
}) => {
  return <RegistrationDetailProvider>{children}</RegistrationDetailProvider>;
};

export default RegistrationDetailLayout;
