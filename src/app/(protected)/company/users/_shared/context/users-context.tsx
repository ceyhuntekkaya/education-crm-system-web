"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { UserListDto } from "@/types/dto/user/UserListDto";
import { UsersContextType } from "../types";
import { mockUsers } from "../mock/users-mock-data";

// Create context
const UsersContext = createContext<UsersContextType | undefined>(undefined);

// Provider component
export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users] = useState<UserListDto[]>(mockUsers);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserListDto | null>(null);

  const refreshUsers = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const value: UsersContextType = {
    users,
    loading,
    selectedUser,
    setSelectedUser,
    refreshUsers,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

// Hook to use users context
export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
