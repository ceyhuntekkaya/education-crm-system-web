"use client";

import React, { createContext, useContext } from "react";
import { useParams } from "next/navigation";
import { UserAddEditContextType } from "../types";
import { useUserById } from "../hooks";
import { parseId } from "../utils";

const UserAddEditContext = createContext<UserAddEditContextType | undefined>(
  undefined
);

export const UserAddEditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const params = useParams();
  const userId = parseId(params.id as string);
  const isEditing = userId !== null;

  const { user, isLoading: userLoading } = useUserById(userId);

  const value: UserAddEditContextType = {
    isEditing,
    userId,
    user,
    userLoading,
  };

  return (
    <UserAddEditContext.Provider value={value}>
      {children}
    </UserAddEditContext.Provider>
  );
};

export const useUserAddEdit = (): UserAddEditContextType => {
  const context = useContext(UserAddEditContext);
  if (context === undefined) {
    throw new Error("useUserAddEdit must be used within a UserAddEditProvider");
  }
  return context;
};
