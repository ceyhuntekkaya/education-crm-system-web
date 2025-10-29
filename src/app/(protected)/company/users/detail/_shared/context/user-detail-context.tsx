"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useParams } from "next/navigation";
import { UserDetailContextType } from "../types";
import { useUserDetail as useUserDetailHook } from "../hooks";
import { createUserSections } from "../utils";
import { USER_SECTIONS } from "../config";

const UserDetailContext = createContext<UserDetailContextType | undefined>(
  undefined
);

export const UserDetailProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const params = useParams();
  const userId = params.id ? parseInt(params.id as string, 10) : null;

  const {
    user: currentUser,
    loading: isLoading,
    error,
    refetch: refetchUser,
  } = useUserDetailHook({ userId });

  // Process sections with useMemo - brand'deki gibi
  const allSections = useMemo(() => {
    return createUserSections(USER_SECTIONS, currentUser);
  }, [currentUser]);

  const value: UserDetailContextType = {
    currentUser,
    isLoading,
    error,
    refetchUser,
    allSections,
  };

  return (
    <UserDetailContext.Provider value={value}>
      {children}
    </UserDetailContext.Provider>
  );
};

export const useUserDetail = (): UserDetailContextType => {
  const context = useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error("useUserDetail must be used within a UserDetailProvider");
  }
  return context;
};
