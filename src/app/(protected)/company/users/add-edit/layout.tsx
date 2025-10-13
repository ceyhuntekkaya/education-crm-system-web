"use client";

import React from "react";

interface UsersAddEditRootLayoutProps {
  children: React.ReactNode;
}

const UsersAddEditRootLayout: React.FC<UsersAddEditRootLayoutProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export default UsersAddEditRootLayout;
