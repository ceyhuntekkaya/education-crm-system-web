"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useAuth } from "@/contexts";
import { SchoolListContextType } from "../types";
import { SchoolDto } from "@/types";

const SchoolListContext = createContext<SchoolListContextType | undefined>(
  undefined
);

interface SchoolListProviderProps {
  children: ReactNode;
}

export const SchoolListProvider: React.FC<SchoolListProviderProps> = ({
  children,
}) => {
  const { user, isLoading } = useAuth();

  const schools = useMemo(() => {
    if (!user?.userRoles) return [];

    const userSchools = user?.userRoles?.[0]?.schools || [];

    // Artık SchoolDto formatı doğrudan kullanıyoruz, dönüştürmeye gerek yok
    return userSchools;
  }, [user]);

  const contextValue: SchoolListContextType = {
    schools,
    loading: isLoading,
  };

  return (
    <SchoolListContext.Provider value={contextValue}>
      {children}
    </SchoolListContext.Provider>
  );
};

export const useSchoolList = (): SchoolListContextType => {
  const context = useContext(SchoolListContext);
  if (context === undefined) {
    throw new Error("useSchoolList must be used within a SchoolListProvider");
  }
  return context;
};
