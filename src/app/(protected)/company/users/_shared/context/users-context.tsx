"use client";

import React, { createContext, useContext, useState } from "react";
import { UserListDto, UserProfileDto } from "@/types";
import { UsersContextType } from "../types";
import { useUsers as useUsersHook } from "../hooks";

// Create context
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Provider component
export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { users, userLoading, userError, refetchUsers } = useUsersHook();
  const [selectedUser, setSelectedUser] = useState<
    UserListDto | UserProfileDto | null
  >(null);

  const value: UsersContextType = {
    users,
    loading: userLoading,
    error: userError,
    selectedUser,
    setSelectedUser,
    refetchUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

// Hook to use users context
export const useUsersContext = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};
