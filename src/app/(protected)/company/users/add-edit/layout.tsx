"use client";

import React from "react";
import { UserAddEditProvider } from "./_shared/context";

interface UsersAddEditRootLayoutProps {
  children: React.ReactNode;
}

const UsersAddEditRootLayout: React.FC<UsersAddEditRootLayoutProps> = ({
  children,
}) => {
  return <UserAddEditProvider>{children}</UserAddEditProvider>;
};

export default UsersAddEditRootLayout;
