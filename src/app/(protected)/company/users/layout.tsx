"use client";

import React from "react";
import { UsersProvider } from "./_shared/context/users-context";

const UsersLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <UsersProvider>
      <>{children}</>
    </UsersProvider>
  );
};

export default UsersLayout;
