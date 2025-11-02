"use client";

import React from "react";
import { UserDetailProvider } from "./_shared/context";

interface UserDetailLayoutProps {
  children: React.ReactNode;
}

const UserDetailLayout: React.FC<UserDetailLayoutProps> = ({ children }) => {
  return <UserDetailProvider>{children}</UserDetailProvider>;
};

export default UserDetailLayout;
